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
        // 在 macOS 上，处理全屏模式
        let is_fullscreen = window.is_fullscreen().unwrap_or(false);
        
        if is_fullscreen {
            // 如果当前是全屏，恢复到正常窗口
            window
                .set_fullscreen(false)
                .map_err(|e| format!("Failed to exit fullscreen: {}", e))
        } else {
            // 如果不是全屏，切换到全屏
            window
                .set_fullscreen(true)
                .map_err(|e| format!("Failed to enter fullscreen: {}", e))
        }
    } else {
        // Windows/Linux 使用正常的最大化
        if window.is_maximized().unwrap_or(false) {
            window
                .unmaximize()
                .map_err(|e| format!("Failed to unmaximize window: {}", e))
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
        window
            .is_fullscreen()
            .map_err(|e| format!("Failed to determine if window is fullscreen: {}", e))
    } else {
        // 在其他平台上，检查是否最大化
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
