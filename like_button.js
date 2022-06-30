"use strict";

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startCount: false,
            countdown: 119,
            btnText: "開始兌換",
        };
    }

    tick() {
        let timeFormated = Math.floor(this.state.countdown / 60) + ":";
        timeFormated += Math.floor(this.state.countdown % 60) < 10 ? "0" + Math.floor(this.state.countdown % 60) : Math.floor(this.state.countdown % 60);

        this.setState((state) => ({
            btnText: "使用期限倒數 " + timeFormated,
            countdown: state.countdown - 1,
        }));

        if (this.state.countdown <= 0) {
            clearInterval(this.interval);
            this.setState(state => ({
                btnText: "兌換完畢",
                countdown: 4
            }))
        }
    }

    count() {
        const yes = confirm("確定兌換？");
        if (yes) {
            this.tick()
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    render() {
        return (
            <button
                onClick={() => this.count()}
                class="w-72 py-3 mb-4 rounded-full bg-yellow-400 text-black"
            >
                {this.state.btnText}
            </button>
        );
    }
}

const domContainer = document.querySelector("#like_button_container");
const root = ReactDOM.createRoot(domContainer);
root.render(<LikeButton />);
