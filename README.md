# 🏀 Elite Ballers

A physics-based basketball shooting game built with pure HTML, CSS, and JavaScript. Test your skills and aim for perfection as you try to make 5 baskets to become an Elite Baller!

## 🎮 Features

- **Physics-based gameplay** - Realistic ball trajectory with gravity and velocity mechanics
- **Power charge system** - Hold the button to build up shot power before releasing
- **Dynamic hoops** - Randomly positioned hoops for each game, keeping gameplay fresh
- **Score tracking** - Track your progress as you aim for 5 baskets
- **Win condition** - Reach 5 successful baskets to earn the "Elite" title

## 🎯 How to Play

1. **Aim** - The ball starts at the bottom left, and the hoop appears randomly on the right side
2. **Charge** - Hold down the "Hold down to shoot!" button to build up power
3. **Release** - Let go of the button to shoot the ball
4. **Score** - Make the basket to increase your score
5. **Win** - Get 5 baskets to become an Elite Baller!

## 🚀 Demo

[Play the game live](https://cocky-meninsky-f1d9fe.netlify.app/basketball.html)

## 🛠️ Technologies

- **HTML5** - Canvas-based game rendering
- **CSS3** - Styling and visual effects
- **JavaScript** - Game logic, physics calculations, and animations

## 📦 Local Setup

To run the game locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/Elite-Ballers.git
   cd Elite-Ballers
   ```

2. Open `src/basketball.html` in your web browser, or serve it using a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```

3. Navigate to `http://localhost:8000/src/basketball.html` in your browser

## 📁 Project Structure

```
Elite-Ballers/
├── README.md
└── src/
    ├── basketball.html      # Main game file
    ├── script/
    │   └── basketball.js    # Game logic and physics
    ├── style/
    │   └── basketball.css   # Styling
    └── images/              # Game assets
        ├── beasley.jpeg
        └── jr.jpeg
```

## 🎨 Game Mechanics

- **Angle**: Fixed at ~30° (0.30π radians) for consistent gameplay
- **Gravity**: Applied constant downward acceleration
- **Collision Detection**: Ball bounces off the backboard when hit
- **Scoring**: Ball must pass through the hoop and fall to complete a basket

## 👥 Contributors

- [George Liu](https://github.com/georgeliu)
- [Michael Yang](https://github.com/Michael269Yang)

Built in grade 10 as a school project. What a game! 🏀

## 📝 License

This project is open source and available for educational purposes.
