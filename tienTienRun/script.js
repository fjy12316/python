// 定义玩家对象
const player = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    vy: 0,
    gravity: 0.5,
    jumpStrength: -10,
    isJumping: false
};

// 定义得分变量
let score = 0;

// 定义障碍物数组
const obstacles = [];

// 定义障碍物生成间隔
const obstacleInterval = 200;
let obstacleTimer = 0;

// 清除画布
function clearCanvas() {
    const ctx = gameCanvas.getContext('2d');
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// 绘制玩家
function drawPlayer() {
    const ctx = gameCanvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 更新玩家状态
function updatePlayer() {
    player.vy += player.gravity;
    player.y += player.vy;

    if (player.y > gameCanvas.height - player.height) {
        player.y = gameCanvas.height - player.height;
        player.vy = 0;
        player.isJumping = false;
    }
}

// 生成障碍物
function generateObstacles() {
    obstacleTimer++;

    if (obstacleTimer >= obstacleInterval) {
        const obstacle = {
            x: gameCanvas.width,
            y: gameCanvas.height - 50,
            width: 30,
            height: 50
        };

        obstacles.push(obstacle);
        obstacleTimer = 0;
    }

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 5;

        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            i--;
        }
    }
}

// 绘制障碍物
function drawObstacles() {
    const ctx = gameCanvas.getContext('2d');
    ctx.fillStyle = 'red';

    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

// 碰撞检测
function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];

        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            // 发生碰撞，游戏结束
            alert('游戏结束！');
            // 重置游戏
            obstacles.length = 0;
            player.y = 300;
            player.vy = 0;
            player.isJumping = false;
        }
    }
}

// 处理按键事件
document.addEventListener('keydown', function(event) {
    if (event.key === ' ' && !player.isJumping) {
        player.vy = player.jumpStrength;
        player.isJumping = true;
    }
});

// 游戏循环
function gameLoop() {
    clearCanvas();
    drawPlayer();
    updatePlayer();
    generateObstacles();
    drawObstacles();
    checkCollision();

    // 更新得分
    score++;

    // 显示得分
    const ctx = gameCanvas.getContext('2d');
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`得分: ${score}`, 10, 30);

    requestAnimationFrame(gameLoop);
}

// 初始化游戏
const gameCanvas = document.getElementById('gameCanvas');
gameLoop();