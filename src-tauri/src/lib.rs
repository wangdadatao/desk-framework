// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod cmd;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            None
        ))
        .invoke_handler(tauri::generate_handler![
            // 窗口控制命令
            cmd::window::minimize_window,
            cmd::window::maximize_window,
            cmd::window::close_window,
            cmd::window::is_window_maximized,
            cmd::window::get_os_info,
            
            // 设置相关命令
            cmd::setting::get_settings,
            cmd::setting::save_settings,
            cmd::setting::set_language,
            cmd::setting::set_theme_mode,
            cmd::setting::get_system_theme,
            cmd::setting::check_autolaunch,
            cmd::setting::set_autolaunch
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
