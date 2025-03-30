use tauri::{Runtime, Window};
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
    
    if is_mac {
        // macOS上使用普通的maximize而不是全屏，以防止系统标题栏出现
        if window.is_maximized().unwrap_or(false) {
            window.unmaximize().map_err(|e| format!("Failed to unmaximize window: {}", e))
        } else {
            window.maximize().map_err(|e| format!("Failed to maximize window: {}", e))
        }
    } else {
        // Windows和Linux上的处理不变
        if window.is_maximized().unwrap_or(false) {
            window.unmaximize().map_err(|e| format!("Failed to unmaximize window: {}", e))
        } else {
            window.maximize().map_err(|e| format!("Failed to maximize window: {}", e))
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
    // 对所有平台都使用is_maximized
    window
        .is_maximized()
        .map_err(|e| format!("Failed to determine if window is maximized: {}", e))
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
