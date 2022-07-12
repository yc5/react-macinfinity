"use strict";

class RedeemButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startCount: false,
      countdown: 119,
      btnText: "開始兌換",
      timeFormated: "1:59",
    };
  }

  tick() {
    let timeFormated = Math.floor(this.state.countdown / 60) + ":";
    timeFormated +=
      Math.floor(this.state.countdown % 60) < 10
        ? "0" + Math.floor(this.state.countdown % 60)
        : Math.floor(this.state.countdown % 60);

    this.setState((state) => ({
      timeFormated: timeFormated,
      btnText: "使用期限倒數 " + timeFormated,
      countdown: state.countdown - 1,
    }));

    if (this.state.countdown <= 0) {
      clearInterval(this.interval);
      this.setState((state) => ({
        startCount: false,
        countdown: 119,
        btnText: "開始兌換",
        timeFormated: "1:59",
      }));
    }
  }

  count() {
    const yes = confirm(
      "確定兌換此優惠券？請確認已在麥當勞櫃檯，點選「確定兌換」後需要在 2分鐘內出示給櫃檯人員。"
    );
    if (yes) {
      this.setState((state) => ({
        startCount: true,
      }));
      this.tick();
      this.interval = setInterval(() => this.tick(), 1000);
    }
  }

  render() {
    return (
      <div className="text-center">
        <p className="pb-4">
          {this.state.startCount
            ? "請於倒數" + this.state.timeFormated + "內出示給櫃檯人員進行兌換"
            : "點選「確定兌換」後需要在2分鐘內出示給櫃檯人員"}
        </p>
        <button
          onClick={() => this.count()}
          className={
            this.state.startCount
              ? "w-72 py-3 mb-4 rounded-full text-red-500 bg-gray-200 pointer-events-none"
              : "w-72 py-3 mb-4 rounded-full text-black bg-yellow-400"
          }
        >
          {this.state.btnText}
        </button>
        {this.state.startCount ? (
          <p>
            <img
              className="inline w-6 mr-2 align-middle"
              src="./assets/ic_icpaymentbtn.png"
            ></img>
            <span className="">使用點點卡付款</span>
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const domContainer = document.querySelector("#redeem_button_container");
const root = ReactDOM.createRoot(domContainer);
root.render(<RedeemButton />);
