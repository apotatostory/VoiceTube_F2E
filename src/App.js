import React, {Component} from 'react';
import Immutable  from 'immutable';
import ShowView from './js/Component/ShowView';
import Utils from './js/Component/Utils';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            type: 'A',
        };
    }

    componentDidMount() {
        // 測試資料
        // 原始資料
        let sourceData = ([
            {
                "id": 52250,
                "thumbnail": "https://cdn.voicetube.com/assets/thumbnails/QxjsWwgPjwM.jpg",
                "title": "台北人英文真的超強？這部影片告訴你！(中英字幕) (Do They Speak English In Taiwan?)",
                "views": 526816,
                "collectCount": 200,
                "duration": 20,
                "publish": 1519880250,
                "level": 1,
                "captions": ["cht", "ja", "vi", "en"]
            }, {
                "id": 52251,
                "thumbnail": "https://cdn.voicetube.com/assets/thumbnails/A9QDgSTVhyM_s.jpg",
                "title": "寶寶失火了!! (THE BABIES ARE ON FIRE!)",
                "views": 5268,
                "collectCount": 180,
                "duration": 60,
                "publish": 1519880251,
                "level": 1,
                "captions": ["cht", "ja", "vi", "en"]
            }, {
                "id": 52252,
                "thumbnail": "https://cdn.voicetube.com/assets/thumbnails/ab47XHidvwQ_s.jpg",
                "title": "軟趴趴的烏賊是如何躲過或是擊退獵食者的？ ",
                "views": 526899,
                "collectCount": 299,
                "duration": 319,
                "publish": 1519880288,
                "level": 1,
                "captions": ["cht", "ja", "vi", "en"]
            }, {
                "id": 52253,
                "thumbnail": "https://cdn.voicetube.com/assets/thumbnails/aIxfi8ikTSs_s.jpg",
                "title": "坂本真綾 - Gravity (Maaya Sakamoto - Gravity)",
                "views": 526700,
                "collectCount": 250,
                "duration": 500,
                "publish": 1517880252,
                "level": 1,
                "captions": ["cht", "ja", "vi", "en"]
            }
        ]);

        this.setState({
            data: sourceData,
        })

        // 等待VoiceTube的API好打開註解 let success = value => {     this.setState({data:
        // value}) }; let err = value => {     this.setState({data: 'error!!!!!!!'}) }
        // // Utils.Ajax; Utils.Ajax('https://merik.voicetube.com/demo/data', 'GET', {},
        // success.bind(this), err.bind(this));
    }

    /**
     * 確認的事件
     * 
     * param type
     */
    handleClick = (type = 'A') => {
        this.setState({
            type: type,
        })
    };

    // filter
    filterVideo = (value, type = 'A') => {
        let result = {
            'A': () => {value.sort((x, y) => x.publish > y.publish? 1 : -1)},
            'B': () => {value.sort((x, y) => x.views > y.views? 1 : -1)},
            'C': () => {value.sort((x, y) => x.collectCount > y.collectCount? 1 : -1)},
            '1': () => {value = value.filter(() => true)},
            '2': () => {value = value.filter(x => x.duration <= 240)},
            '3': () => {value = value.filter(x => x.duration > 240 && x.duration <= 600)},
            '4': () => {value = value.filter(x => x.duration > 600)}
        };

        if(value) {
            result[type]();
        }

        return value;
    };

    render() {
        let data = this.state.data;
        let showData;

        if (data){
            // 畫面顯示資料
            let ctrlData = [];
            data.forEach(x => ctrlData.push(x));
            
            // 篩選
            showData = this.filterVideo(ctrlData, this.state.type);
        }
        
        return (
            <div className="container">
                {/* 上層表單 */}
                <nav className="navbar navbar-expand-sm">
                    <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item">
                            <div className="nav-link disabled">排序</div>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link active"
                                data-toggle="pill"
                                onClick={() => this.handleClick('A')}>發布時間</button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link"
                                data-toggle="pill"
                                onClick={() => this.handleClick('B')}>觀看次數</button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link"
                                data-toggle="pill"
                                onClick={() => this.handleClick('C')}>收藏次數</button>
                        </li>
                    </ul>
                    <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item">
                            <div className="nav-link disabled">長度</div>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link active"
                                data-toggle="pill"
                                onClick={() => this.handleClick('1')}>不限</button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link"
                                data-toggle="pill"
                                onClick={() => this.handleClick('2')}>4分鐘以下</button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link"
                                data-toggle="pill"
                                onClick={() => this.handleClick('3')}>5-10分鐘</button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link"
                                data-toggle="pill"
                                onClick={() => this.handleClick('4')}>超過10分鐘</button>
                        </li>
                    </ul>
                </nav>
                <div className="tab-content">
                    <div className="container tab-pane active">
                        <ShowView data={showData}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;