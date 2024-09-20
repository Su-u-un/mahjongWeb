document.addEventListener("DOMContentLoaded", function() {
    // 定义回调函数
    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 当元素进入视口时调用函数
                changeCharacter(
                    'Little Fox Chiyo',
                    '小狸千代',
                    './images/roleInfo/role1.png',
                    './images/roleInfo/roleShadow1.png',
                    '永遠宅在家的電競高手，平常除了貓貓之外沒有什麼特別喜歡的東西，無力氣、電波系，喜歡麻將。體力值為零。 但在pvp遊戲中勝負欲極強。因為滑鼠、鍵盤、手機同時壞掉了，不得不出外的時候偶然遇上了主角，受到主角的幫助後，加了好友一起打麻將。','./audio/1.wav',
                    1
                );
                // observer.unobserve(entry.target); // 只调用一次
            }
        });
    };

    // 创建观察者
    const observer = new IntersectionObserver(callback);

    // 观察指定的元素
    const section = document.getElementById('box5');
    observer.observe(section);
});
let selectedAvatarIndex = null; // 用于跟踪当前选中的头像

function changeCharacter(name, nickname, imgSrc, backImg,intro, audioSrc, index) {
    const characterInfo = document.getElementById('character-info');
    const characterENName = document.getElementById('character-en-name');
    const characterName = document.getElementById('character-name');
    const characterIntro = document.getElementById('character-intro');
    const characterImage = document.getElementById('character-image');
    const roleShadow = document.getElementById('roleShadow');
    const characterAudio = document.getElementById('character-audio'); // 获取音频元素
    // 清除之前选中的头像样式
    if (selectedAvatarIndex !== null) {
        const previousAvatar = document.querySelector(`.avatarBox .avatar:nth-child(${selectedAvatarIndex})`);
        if (previousAvatar) {
            previousAvatar.classList.remove('selected');
        }
    }

    // 设置当前选中的头像样式
    const currentAvatar = document.querySelector(`.avatarBox .avatar:nth-child(${index})`);
    if (currentAvatar) {
        currentAvatar.classList.add('selected');
    }
    
    selectedAvatarIndex = index; // 更新选中索引

    // 淡出当前信息
    characterInfo.classList.add('fade-out');

    // 隐藏图片
    characterImage.classList.remove('show');

    // 在淡出结束后更新信息
    setTimeout(() => {
        characterENName.textContent=name;
        characterName.textContent = nickname;
        characterIntro.textContent = intro;
        characterImage.style.backgroundImage = `url('${imgSrc}')`;
        roleShadow.style.backgroundImage = `url('${backImg}')`;
 // 更新音频源
 characterAudio.src = audioSrc;

        // 再次淡入新信息
        characterInfo.classList.remove('fade-out');

        // 显示新图片
        characterImage.classList.add('show');
    }, 500); // 与 CSS 中的过渡时间一致
}
function playVoice() {
    const characterAudio = document.getElementById('character-audio');
    if (characterAudio.src) {
        characterAudio.play(); // 播放音频
    }
}