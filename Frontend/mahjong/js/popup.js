let progress = 0;
const progressBar = document.getElementById('progressBar');
const loadingText = document.getElementById('loadingText');
const loadingContainer = document.getElementById('loadingContainer');
const content = document.getElementById('content');
const character = document.getElementById('character');

const characterImages = [
    "./images/draft/icon.png",

];

let imageIndex = 0;

// 切换角色图片的函数
function changeCharacterImage() {
    character.src = characterImages[imageIndex];
    imageIndex = (imageIndex + 1) % characterImages.length;
}

const totalDuration = 1000; // 2秒
const interval = 100; // 每100毫秒更新进度条
const imageChangeInterval = 300; // 每300毫秒切换一次图片

const loadingInterval = setInterval(() => {
    if (progress < 100) {
        const randomIncrement = Math.floor(Math.random() * 10) + 1; // 随机增加1到5
        progress = Math.min(progress + randomIncrement, 100);
        progressBar.style.width = progress + '%';
        loadingText.textContent = `Loading... ${progress}%`;
    } else {
        clearInterval(loadingInterval);
        loadingText.textContent = 'Comeleted!';
        setTimeout(() => {
            loadingContainer.style.display = 'none'; // 关闭加载弹窗
            content.style.display = 'block'; // 显示内容
            setTimeout(() => {
                content.style.opacity = 1; // 淡入效果
            }, 10); // 确保 display: block 后再进行淡入
        }, 500); // 延迟500毫秒后关闭
    }
}, interval);

// 单独的图片切换定时器
const imageInterval = setInterval(() => {
    if (progress < 100) {
        changeCharacterImage();
    } else {
        clearInterval(imageInterval); // 加载完成后停止切换图片
    }
}, imageChangeInterval);