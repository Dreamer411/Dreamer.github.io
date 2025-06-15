document.addEventListener('DOMContentLoaded', function() {
    // 检查用户登录状态
    updateUserStatus();
    
    // 设置Netlify Identity
    if (window.netlifyIdentity) {
        window.netlifyIdentity.on("init", user => {
            if (!user) {
                window.netlifyIdentity.on("login", () => {
                    updateUserStatus();
                    window.location.reload();
                });
            }
        });
    }
});

function updateUserStatus() {
    const userStatus = document.getElementById('user-status');
    const contentDiv = document.getElementById('content');
    
    const user = netlifyIdentity.currentUser();
    
    if (user) {
        // 用户已登录
        userStatus.innerHTML = `
            <p>欢迎, ${user.user_metadata.full_name || user.email}!</p>
            <button onclick="netlifyIdentity.logout()">退出登录</button>
        `;
        
        contentDiv.innerHTML = `
            <h2>社区内容</h2>
            <p>这里是只有会员才能看到的内容。</p>
            <!-- 可以在这里添加更多社区功能 -->
        `;
    } else {
        // 用户未登录
        userStatus.innerHTML = `
            <button onclick="netlifyIdentity.open('login')">登录</button>
            <button onclick="netlifyIdentity.open('signup')">注册</button>
        `;
        
        contentDiv.innerHTML = `
            <h2>欢迎访问</h2>
            <p>请登录或注册成为会员。</p>
        `;
    }
}