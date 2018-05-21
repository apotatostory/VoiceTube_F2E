import React, {Component} from 'react';
import ShowView from './js/Component/ShowView';
import Utils from './js/Component/Utils';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',   // 原始資料
            sort: 'A',   // 初始排序
            filter: 1, // 初始篩選
        };
    }

    componentDidMount() {
        let success = value => {
            if(value.status) {
                // 初始化需要顯示的資料
                let ctrlData = [];
                value.data.forEach(x => ctrlData.push(x));

                this.setState({
                    data: value.data
                })
            }
        };
        let err = value => {
            alert('ajax錯誤!!!');
        }
        Utils.Ajax('https://merik.voicetube.com/demo/data', 'GET', {}, success.bind(this), err.bind(this));
    }

    sortClick = (type = 'A') => {
        this.setState({sort: type})
    };

    filterClick = (type = 1) => {
        this.setState({filter: type})
    };

    // 篩選
    filterVideo = () => {
        let sort = this.state.sort;
        let filter = this.state.filter;
        let data = this.state.data;
        let result = [];

        // 初始化顯示資料
        if (data) {
            data.forEach(x => result.push(x));
        }
        let filterUtil = {
            'A': () => {result.sort((x, y) => x.publish > y.publish? 1 : -1)},
            'B': () => {result.sort((x, y) => x.views > y.views? 1 : -1)},
            'C': () => {result.sort((x, y) => x.collectCount > y.collectCount? 1 : -1)},
            1: () => {result = result.filter(() => true)},
            2: () => {result = result.filter(x => x.duration <= 240)},
            3: () => {result = result.filter(x => x.duration > 240 && x.duration <= 600)},
            4: () => {result = result.filter(x => x.duration > 600)}
        };

        // 先篩選在排序
        filterUtil[filter]();
        filterUtil[sort]();

        return result;
    };

    render() {

        let showData = this.filterVideo();;

        return (
            <div className="container">
                {/* 上層表單 */}
                <nav className="navbar navbar-expand-sm ">
                    <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item">
                            <div className="nav-link disabled"><b>排序</b></div>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link active"
                                data-toggle="pill"
                                onClick={() => this.sortClick('A')}>發布時間</button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link"
                                data-toggle="pill"
                                onClick={() => this.sortClick('B')}>觀看次數</button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link"
                                data-toggle="pill"
                                onClick={() => this.sortClick('C')}>收藏次數</button>
                        </li>
                    </ul>
                    <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item">
                            <div className="nav-link disabled"><b>長度</b></div>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link active"
                                data-toggle="pill"
                                onClick={() => this.filterClick(1)}>不限</button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link"
                                data-toggle="pill"
                                onClick={() => this.filterClick(2)}>4分鐘以下</button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link"
                                data-toggle="pill"
                                onClick={() => this.filterClick(3)}>5-10分鐘</button>
                        </li>
                        <li className="nav-item">
                            <button
                                type="button"
                                className="btn btn-light nav-link"
                                data-toggle="pill"
                                onClick={() => this.filterClick(4)}>超過10分鐘</button>
                        </li>
                    </ul>
                </nav>
                {/* 篩選內容 */}
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