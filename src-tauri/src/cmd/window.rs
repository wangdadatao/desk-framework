use tauri::{Runtime, Window, Manager};
use std::env;

#[tauri::command]
pub fn minimize_window<R: Runtime>(window: Window<R>) -> Result<(), String> {
    window
        .minimize()
        .map_err(|e| format!("Failed to minimize window: {}", e))
}

#[tauri::command]
pub fn maximize_window<R: Runtime>(window: Window<R>) -> Result<(), String> {
    let is_mac = env::consts::OS == "macos";
    
    if window.is_maximized().unwrap_or(false) {
        window
            .unmaximize()
            .map_err(|e| format!("Failed to unmaximize window: {}", e))
    } else {
        if is_mac {
            // 在 macOS 上，使用全屏而不是最大化以解决标题栏问题
            if let Err(e) = window.set_fullscreen(true) {
                return Err(format!("Failed to set fullscreen: {}", e));
            }
            Ok(())
        } else {
            window
                .maximize()
                .map_err(|e| format!("Failed to maximize window: {}", e))
        }
    }
}

#[tauri::command]
pub fn close_window<R: Runtime>(window: Window<R>) -> Result<(), String> {
    window
        .close()
        .map_err(|e| format!("Failed to close window: {}", e))
}

#[tauri::command]
pub fn is_window_maximized<R: Runtime>(window: Window<R>) -> Result<bool, String> {
    let is_mac = env::consts::OS == "macos";
    
    if is_mac {
        // 在 macOS 上，检查是否全屏
        Ok(window.is_fullscreen().unwrap_or(false))
    } else {
        window
            .is_maximized()
            .map_err(|e| format!("Failed to determine if window is maximized: {}", e))
    }
}

#[tauri::command]
pub fn get_os_info() -> serde_json::Value {
    let os_type = env::consts::OS;
    let os_family = match os_type {
        "macos" => "mac",
        "windows" => "windows",
        "linux" => "linux",
        _ => "unknown"
    };
    
    serde_json::json!({
        "name": os_type,
        "family": os_family,
        "version": env::consts::ARCH,
    })
}
