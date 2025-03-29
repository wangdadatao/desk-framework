use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Runtime, Manager};
use tauri_plugin_autostart::ManagerExt;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub enum ThemeMode {
    Light,
    Dark,
    System,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AppSettings {
    pub language: String,
    pub theme_mode: ThemeMode,
    pub start_at_login: bool,
}

impl Default for AppSettings {
    fn default() -> Self {
        Self {
            language: "zh-CN".to_string(),
            theme_mode: ThemeMode::System,
            start_at_login: false,
        }
    }
}

fn get_settings_path<R: Runtime>(app: &AppHandle<R>) -> PathBuf {
    let app_dir = app
        .path()
        .app_config_dir()
        .expect("Failed to get app config directory");
    
    fs::create_dir_all(&app_dir).expect("Failed to create app config directory");
    app_dir.join("settings.json")
}

#[tauri::command]
pub fn get_settings<R: Runtime>(app: AppHandle<R>) -> Result<AppSettings, String> {
    let settings_path = get_settings_path(&app);
    
    if !settings_path.exists() {
        let default_settings = AppSettings::default();
        let json = serde_json::to_string_pretty(&default_settings)
            .map_err(|e| format!("Failed to serialize default settings: {}", e))?;
        
        fs::write(&settings_path, json)
            .map_err(|e| format!("Failed to write default settings: {}", e))?;
        
        return Ok(default_settings);
    }
    
    let content = fs::read_to_string(&settings_path)
        .map_err(|e| format!("Failed to read settings file: {}", e))?;
    
    serde_json::from_str(&content)
        .map_err(|e| format!("Failed to parse settings JSON: {}", e))
}

#[tauri::command]
pub fn save_settings<R: Runtime>(app: AppHandle<R>, settings: AppSettings) -> Result<(), String> {
    let settings_path = get_settings_path(&app);
    
    // 保存设置到文件
    let json = serde_json::to_string_pretty(&settings)
        .map_err(|e| format!("Failed to serialize settings: {}", e))?;
    
    fs::write(settings_path, json)
        .map_err(|e| format!("Failed to write settings: {}", e))?;
    
    // 如果自动启动设置有变化，同步更新系统自动启动设置
    if settings.start_at_login {
        if let Err(e) = app.autolaunch().enable() {
            eprintln!("Failed to enable autolaunch: {}", e);
        }
    } else {
        if let Err(e) = app.autolaunch().disable() {
            eprintln!("Failed to disable autolaunch: {}", e);
        }
    }
    
    Ok(())
}

#[tauri::command]
pub fn set_language<R: Runtime>(app: AppHandle<R>, language: String) -> Result<(), String> {
    let mut settings = get_settings(app.clone())?;
    settings.language = language;
    save_settings(app, settings)
}

#[tauri::command]
pub fn set_theme_mode<R: Runtime>(app: AppHandle<R>, theme_mode: ThemeMode) -> Result<(), String> {
    let mut settings = get_settings(app.clone())?;
    settings.theme_mode = theme_mode;
    save_settings(app, settings)
}

#[tauri::command]
pub fn get_system_theme() -> Result<bool, String> {
    #[cfg(target_os = "windows")]
    {
        use winreg::enums::*;
        use winreg::RegKey;
        
        let hkcu = RegKey::predef(HKEY_CURRENT_USER);
        match hkcu.open_subkey("Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize") {
            Ok(key) => {
                match key.get_value::<u32, _>("AppsUseLightTheme") {
                    Ok(value) => Ok(value == 0), // 0表示暗色主题
                    Err(_) => Ok(false) // 默认不是暗色
                }
            },
            Err(_) => Ok(false) // 无法读取则默认不是暗色
        }
    }
    
    #[cfg(target_os = "macos")]
    {
        use chrono::{Local, Timelike};
        
        let hour = Local::now().hour();
        Ok(hour < 6 || hour > 18) // 晚上6点到早上6点默认为暗色主题
    }
    
    #[cfg(not(any(target_os = "windows", target_os = "macos")))]
    {
        use chrono::{Local, Timelike};
        
        let hour = Local::now().hour();
        Ok(hour < 6 || hour > 18) // 晚上6点到早上6点默认为暗色主题
    }
}

#[tauri::command]
pub fn check_autolaunch<R: Runtime>(app: AppHandle<R>) -> Result<bool, String> {
    app.autolaunch()
        .is_enabled()
        .map_err(|e| format!("Failed to check autolaunch status: {}", e))
}

#[tauri::command]
pub fn set_autolaunch<R: Runtime>(app: AppHandle<R>, enable: bool) -> Result<(), String> {
    let mut settings = get_settings(app.clone())?;
    
    // 更新设置中的自动启动选项
    settings.start_at_login = enable;
    
    // 保存设置并同步系统自动启动设置
    save_settings(app, settings)
}
