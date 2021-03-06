import React from 'react'
import Task from 'public/Task'
import Toolkit from 'public/Toolkit'
import './index.less'
import { Select, Option } from 'bfd-ui/lib/Select2'
import Upload from 'bfd-ui/lib/Upload'
import { Modal, ModalHeader, ModalBody } from 'bfd-ui/lib/Modal'
import ClearableInput from 'bfd-ui/lib/ClearableInput'
import Icon from 'bfd-ui/lib/Icon'
import confirm from 'bfd-ui/lib/confirm'
import Fetch from 'bfd-ui/lib/Fetch'
import Head from './Head'
import MyTable from './MyTable'
import Navigate from './Navigate'
import NavigationInPage from 'public/NavigationInPage'
import HdfsConf from '../Conf/HdfsConf'

export default React.createClass({
  getInitialState:function(){
    return {
      data:[],
      spaceData:[],
      tableData:{"totalList":[],"currentPage": 1,"totalPageNum": 500},
      cur_relative_path:"/",
      is_first:0,
      num:0,
      treePath:"/",
      random:0,
    };
  },
  updateTableList(data,num){
    this.setState({data:data,num:num});
  },
  componentWillReceiveProps(){
    this.setState({"cur_relative_path":"/","is_first":0});
  },
  updateSpace(cur_space){
    let is_first=0;
    let cur_relative_path = "/";
    this.setState({cur_space:cur_space,is_first:0,cur_relative_path:cur_relative_path});
  },
  getTableSuccess(data){
    //当前只获取了表格的数据。其实还应该获取表格的总记录数. // num
    this.setState({tableData:data,num:data.totalPageNum});
  },
  updateSkipUrl(url){
    let is_first = this.state.is_first;
    if(url=="/" || url==""){
      is_first = 0;
    }
    this.setState({cur_relative_path:url,is_first:is_first});
  },
  updateCurRelativePath(crp){
    //修改当前路径
    let old_relative_path = this.state.cur_relative_path;
    let cur1_relative_path =  `${old_relative_path}${crp}`;
    let cur_relative_path1 = cur1_relative_path.replace("//","/");
    this.setState({cur_relative_path:cur_relative_path1,is_first:1});
  },
  updateRandom(random){
    //修改random信息,让页面刷新
    this.setState({random:random});
  },
  updateTableData(data,num){
    //data: new data array, num: num operator
    let old_num  = this.state.num;
    let cur_num = old_num+num;
    this.setState({tableData:data,num:cur_num});
  },
  addTableData(){
    let data = this.state.tableData;
    let create_time = Toolkit.generateTimeStrByMilliSeconds(-1);
    create_time = create_time.replace("T"," "); //工具包中的函数不满足需求故临时处理一下
    let row = {"name":"new_dir","create_time":create_time,"size":"-","is_dir":"1","is_new":0};
    let totalList = data.totalList;
    totalList.unshift(row);
    data.totalList =totalList;
    let num = this.state.num+1;
    this.setState({tableData:data,num:num});
  },
  requestArgs:{
    pageName:"MyFile",
    type:"",
    spaceName:"",
    relativePath:"",
    targetPath:"",
  },
  getUrlData({type="",spaceName="",relativePath="",targetPath=""}){
    this.requestArgs.type = type;
    this.requestArgs.spaceName = spaceName;
    this.requestArgs.relativePath = relativePath;
    this.requestArgs.targetPath = targetPath;
    return HdfsConf.getUrlData(this.requestArgs);
  },
  render(){
    let spaceName = HdfsConf.getCurSpace(this);
    let listStatusUrl = this.getUrlData({ type : "LIST_STATUS",
                                          spaceName : spaceName,
                                          relativePath : this.state.cur_relative_path
                                        });
    return (
      <div className="hdfs-myfile">
        <NavigationInPage headText={HdfsConf.getNavigationData({ pageName : this.requestArgs.pageName,
                                                                 type : "headText"})}
                          naviTexts={HdfsConf.getNavigationData({ pageName : this.requestArgs.pageName,
                                                                  type : "navigationTexts",
                                                                  spaceName : spaceName})} />
        <Head updateTableList={this.updateTableList} getUrlData={this.getUrlData} updateRandom={this.updateRandom} cur_path={this.state.cur_relative_path} updateSpace={this.updateSpace}  spaceData={this.state.spaceData}  cur_space={spaceName}  addTableData={this.addTableData}/>
        <Navigate cur_path={this.state.cur_relative_path} is_first={this.state.is_first} num={this.state.num} updateSkipUrl={this.updateSkipUrl} />
        <MyTable list="ALL" data={this.state.tableData} getUrlData={this.getUrlData} updateRandom={this.updateRandom} cur_path={this.state.cur_relative_path} cur_space={spaceName} updateCurRelativePath={this.updateCurRelativePath} updateTableData={this.updateTableData} />
        <Fetch style={{minHeight:0}} url={`${listStatusUrl}&random=${this.state.random}`} onSuccess={this.getTableSuccess}>
        </Fetch>
      </div>
    )
  }
})
