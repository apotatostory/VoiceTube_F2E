import React, {Component} from 'react';

class ShowView extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }
    render() {
        let video = this.props.data;
        let result = [];

        // 把array轉成實體
        if (video && video.length != 0) {
            console.log('有資料');

            video.forEach(element => {
                result.push(
                    <div className="card">
                        <img className="card-img-top" src={element.thumbnail} alt="Card image"></img>
                        <div className="card-body">
                            <p className="card-text">{element.title}</p>
                            <button type="button"></button>
                        </div>
                    </div>
                );
            })
            return (
                <div>{result}</div>
            );

        } else {
            console.log('沒有資料');
            return (
                <div>
                    <h2>沒有篩選結果</h2>
                </div>
            );
        }
    }
}

export default ShowView;