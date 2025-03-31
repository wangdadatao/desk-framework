/**
 * 项目初始化脚本
 * 
 * 使用方法:
 * 1. node scripts/init-project.js "新项目名" "项目描述" "你的名字" "app.identifier"
 * 
 * 例如:
 * node scripts/init-project.js "My App" "A beautiful app" "Your Name" "com.example.myapp"
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 用户输入处理
let newProjectName = process.argv[2];
let projectDescription = process.argv[3] || '';
let author = process.argv[4] || '';
let appIdentifier = process.argv[5] || '';

// 如果没有通过命令行参数提供项目名称，则进行交互式提示
function promptUser() {
  return new Promise((resolve) => {
    if (!newProjectName) {
      rl.question('请输入新项目名称: ', (answer) => {
        newProjectName = answer.trim();
        if (!newProjectName) {
          console.error('错误: 项目名称不能为空');
          process.exit(1);
        }
        
        rl.question('请输入项目描述 (可选): ', (answer) => {
          projectDescription = answer.trim();
          
          rl.question('请输入作者名称 (可选): ', (answer) => {
            author = answer.trim();
            
            rl.question('请输入应用标识符 (例如 com.example.app): ', (answer) => {
              appIdentifier = answer.trim() || `cc.dager.${newProjectName.toLowerCase().replace(/\s+/g, '-')}`;
              rl.close();
              resolve();
            });
          });
        });
      });
    } else {
      appIdentifier = appIdentifier || `cc.dager.${newProjectName.toLowerCase().replace(/\s+/g, '-')}`;
      rl.close();
      resolve();
    }
  });
}

// 主函数
async function main() {
  await promptUser();
  
  const rootDir = path.resolve(__dirname, '..');
  const projectNameSlug = newProjectName.toLowerCase().replace(/\s+/g, '-');
  
  console.log('\n开始初始化新项目...');
  console.log(`项目名称: ${newProjectName}`);
  console.log(`项目描述: ${projectDescription || '(无)'}`);
  console.log(`作者: ${author || '(无)'}`);
  console.log(`应用标识符: ${appIdentifier}`);
  console.log('----------------------------');
  
  try {
    // 1. 修改 package.json
    updatePackageJson(rootDir, newProjectName, projectDescription);
    
    // 2. 修改 Cargo.toml
    updateCargoToml(rootDir, newProjectName, projectDescription, author);
    
    // 3. 修改 tauri.conf.json
    updateTauriConfig(rootDir, newProjectName, appIdentifier);
    
    // 4. 更新应用标题
    updateAppTitle(rootDir, newProjectName);
    
    // 5. 更新 main.rs 中的库引用
    updateMainRs(rootDir, projectNameSlug);
    
    console.log('\n✅ 项目初始化完成！');
    console.log('\n可以开始使用以下命令运行您的项目:');
    console.log('   npm run tauri');
    
  } catch (error) {
    console.error('初始化过程中出错:', error);
  }
}

// 更新 package.json
function updatePackageJson(rootDir, projectName, description) {
  console.log('📝 正在更新 package.json...');
  
  const packageJsonPath = path.join(rootDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  packageJson.name = projectName.toLowerCase().replace(/\s+/g, '-');
  packageJson.version = '0.1.0';
  
  if (description) {
    packageJson.description = description;
  }
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// 更新 Cargo.toml
function updateCargoToml(rootDir, projectName, description, author) {
  console.log('📝 正在更新 Cargo.toml...');
  
  const cargoTomlPath = path.join(rootDir, 'src-tauri', 'Cargo.toml');
  let cargoToml = fs.readFileSync(cargoTomlPath, 'utf8');
  
  const projectNameSlug = projectName.toLowerCase().replace(/\s+/g, '-');
  
  // 更新包名
  cargoToml = cargoToml.replace(/name = "desk-framework"/, `name = "${projectNameSlug}"`);
  
  // 更新描述
  if (description) {
    cargoToml = cargoToml.replace(/description = ".*?"/, `description = "${description}"`);
  }
  
  // 更新作者
  if (author) {
    cargoToml = cargoToml.replace(/authors = \["you"\]/, `authors = ["${author}"]`);
  }
  
  // 更新库名
  const libNameSlug = projectNameSlug.replace(/-/g, '_');
  cargoToml = cargoToml.replace(/name = "desk_framework_lib"/, `name = "${libNameSlug}_lib"`);
  
  fs.writeFileSync(cargoTomlPath, cargoToml);
}

// 更新 tauri.conf.json
function updateTauriConfig(rootDir, projectName, appIdentifier) {
  console.log('📝 正在更新 tauri.conf.json...');
  
  const tauriConfigPath = path.join(rootDir, 'src-tauri', 'tauri.conf.json');
  const tauriConfig = JSON.parse(fs.readFileSync(tauriConfigPath, 'utf8'));
  
  tauriConfig.productName = projectName;
  tauriConfig.identifier = appIdentifier;
  
  // 设置窗口标题
  for (const window of tauriConfig.app.windows) {
    window.title = projectName;
  }
  
  fs.writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2));
}

// 更新应用中的标题
function updateAppTitle(rootDir, projectName) {
  console.log('📝 正在更新应用标题...');
  
  // 更新 SidebarMenu.vue 中的标题
  const sidebarMenuPath = path.join(rootDir, 'src', 'components', 'SidebarMenu.vue');
  let sidebarMenuContent = fs.readFileSync(sidebarMenuPath, 'utf8');
  
  sidebarMenuContent = sidebarMenuContent.replace(
    /<h2 class="font-semibold text-lg">Desk Framework<\/h2>/,
    `<h2 class="font-semibold text-lg">${projectName}</h2>`
  );
  
  fs.writeFileSync(sidebarMenuPath, sidebarMenuContent);
  
  // 更新 App.vue 中的标题引用
  const appVuePath = path.join(rootDir, 'src', 'App.vue');
  let appVueContent = fs.readFileSync(appVuePath, 'utf8');
  
  if (appVueContent.includes("appTitle = ref('Desk Framework')")) {
    appVueContent = appVueContent.replace(
      /appTitle = ref\('Desk Framework'\)/,
      `appTitle = ref('${projectName}')`
    );
    
    fs.writeFileSync(appVuePath, appVueContent);
  }
}

// 更新 main.rs
function updateMainRs(rootDir, projectNameSlug) {
  console.log('📝 正在更新 main.rs...');
  
  const mainRsPath = path.join(rootDir, 'src-tauri', 'src', 'main.rs');
  let mainRsContent = fs.readFileSync(mainRsPath, 'utf8');
  
  // 将连字符替换为下划线，以符合 Rust 命名规范
  const libNameSlug = projectNameSlug.replace(/-/g, '_');
  
  // 替换库名引用
  mainRsContent = mainRsContent.replace(
    /desk_framework_lib::run\(\)/,
    `${libNameSlug}_lib::run()`
  );
  
  fs.writeFileSync(mainRsPath, mainRsContent);
}

// 启动脚本
main();
