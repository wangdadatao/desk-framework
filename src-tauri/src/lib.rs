// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod cmd;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        // 修复 autostart 插件初始化
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            None
        ))
        .invoke_handler(tauri::generate_handler![
            greet,
            cmd::minimize_window,
            cmd::maximize_window,
            cmd::close_window,
            cmd::is_window_maximized,
            cmd::get_os_info,
            cmd::get_settings,
            cmd::save_settings,
            cmd::set_language,
            cmd::set_theme_mode,
            cmd::get_system_theme,
            cmd::check_autolaunch,
            cmd::set_autolaunch
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
