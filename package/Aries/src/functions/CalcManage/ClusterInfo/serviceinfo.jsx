import React from 'react'

import ClusterCommonInfo from './index.jsx'
import CMDR from '../CalcManageDataRequester/requester.js'
import CalcManageConf from '../UrlConf'
import './index.less'

export default React.createClass({
  
  getInitialState: function () {
    return { dataTableDataArr:[] }
  },

  checkToRequestData(){
    // 如果当前保存的namespace与实时获取的namespace相同，则不再重新请求
    // 否则，重新请求数据
    let curNameSpace = CMDR.getCurNameSpace(this)
    if ( this.curNameSpace !== curNameSpace ){
      CMDR.getServiceList( curNameSpace,(executedData)=>{
        this.setState ({ 'dataTableDataArr':executedData })
      } )
      this.curNameSpace = curNameSpace
    }
  },

  // 当namespace切换的时候，将会强制调用这个render函数
  render: function() {
    let dataTableConfigDict = {
        // 表格信息
      column: [{ title:'Name',          key:'Name',	        order:true }, 
               { title:'ClusterIP',	    key:'ClusterIP',	  order:true }, 
               { title:'ExternalIP',	  key:'ExternalIP',	  order:true }, 
               { title:'Ports',         key:'Ports',	      order:true },
               { title:'CreationTime',	key:'CreationTime', order:true },
               { title:'Selector',	    key:'Selector',	    order:true }],
      showPage:'false'
    }
    let navigationKey = 'ServiceInfo'
    let spaceName = CalcManageConf.getCurSpace(this);    
    let rootDivClassName = 'ServiceInfoChildRootDiv'
    let defaultDetailText = [['请选择Service']]

    this.checkToRequestData()

    return (
      <ClusterCommonInfo dataTableConfigDict={dataTableConfigDict}
                         rootDivClassName={rootDivClassName}
                         navigationKey={navigationKey}
                         spaceName={spaceName}
                         defaultDetailText={defaultDetailText}
                         dataTableDataArr={this.state.dataTableDataArr} />
    ) 
  }
});



