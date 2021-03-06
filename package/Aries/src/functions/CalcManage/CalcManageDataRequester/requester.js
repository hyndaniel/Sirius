import xhr from 'bfd-ui/lib/xhr'
import message from 'bfd/message'
import Toolkit from 'public/Toolkit/index.js'

var CalcManageDataRequester = {
  getCurNameSpace(_this) {
    return _this.props.location.query.cur_space
  },
  getUrlForm() {
    return {
      'podlist': 'v1/k8s/api/namespaces/{nameSpace}/pods',
      'servicelist': 'v1/k8s/api/namespaces/{nameSpace}/services',
      'rclist': 'v1/k8s/api/namespaces/{nameSpace}/replicationcontrollers',
      'ingresslist': 'v1/k8s/apis/extensions/v1beta1/namespaces/{nameSpace}/ingresses',
      'mytasklist': 'v1/k8s/api/namespaces/mytasklist',
      'mytaskgraph': 'v1/k8s/api/namespaces/mytaskgraph',

      'mytaskoldrecords': 'v1/k8s/api/namespaces/mytasklist/getoldrecords',
      'mytaskhasnewrecords': 'v1/k8s/api/namespaces/mytasklist/checkhasnewrecords',
      'mytasknewrecords': 'v1/k8s/api/namespaces/mytasklist/getnewrecords',

      'clustercpuinfo': 'v1/k8s/api/clusterinfo/cpu/{minutes}',
      'clustermemoryinfo': 'v1/k8s/api/clusterinfo/memory/{minutes}',
      'clusternetworkinfo': 'v1/k8s/api/clusterinfo/network/{minutes}',
      'clusterfilesysteminfo': 'v1/k8s/api/clusterinfo/filesystem/{minutes}',

    }
  },

  getClusterCPUInfo(minutes, callback) {
    let url = Toolkit.strFormatter.formatString(this.getUrlForm()['clustercpuinfo'], {
      'minutes': minutes
    })
    this.xhrGetDataEnhanced(url, callback)
  },

  getClusterMemoryInfo(minutes, callback) {
    let url = Toolkit.strFormatter.formatString(this.getUrlForm()['clustermemoryinfo'], {
      'minutes': minutes
    })
    this.xhrGetDataEnhanced(url, callback)
  },

  getClusterNetworkInfo(minutes, callback) {
    let url = Toolkit.strFormatter.formatString(this.getUrlForm()['clusternetworkinfo'], {
      'minutes': minutes
    })
    this.xhrGetDataEnhanced(url, callback)
  },

  getClusterFilesystemInfo(minutes, callback) {
    let url = Toolkit.strFormatter.formatString(this.getUrlForm()['clusterfilesysteminfo'], {
      'minutes': minutes
    })
    this.xhrGetDataEnhanced(url, callback)
  },

  getMyTaskOldRecords(oldestrecordid, requestnumber, keywords, callback) {
    let url = this.getUrlForm()['mytaskoldrecords']
    let data = {
      oldestrecordid: oldestrecordid,
      requestnumber: requestnumber,
      keywords: keywords
    }
    this.xhrPostData(url, data, callback)
  },

  checkMyTaskHasNewRecords(newestrecordid, keywords, callback) {
    let url = this.getUrlForm()['mytaskhasnewrecords']
    let data = {
      newestrecordid: newestrecordid,
      keywords: keywords
    }
    this.xhrPostData(url, data, callback)
  },

  getMyTaskNewRecords(newestrecordid, keywords, callback) {
    let url = this.getUrlForm()['mytasknewrecords']
    let data = {
      newestrecordid: newestrecordid,
      keywords: keywords
    }
    this.xhrPostData(url, data, callback)
  },

  getMytaskGraph(_this, callback) {
    let url = this.getUrlForm()['mytaskgraph']
    this.xhrGetData(url, _this, callback)
  },

  getMytaskList(_this, callback) {
    let url = this.getUrlForm()['mytasklist']
    this.xhrGetData(url, _this, callback)
  },

  getPodList(nameSpace, callback) {
    let url = Toolkit.strFormatter.formatString(this.getUrlForm()['podlist'], {
      'nameSpace': nameSpace
    })
    this.xhrGetDataEnhanced(url, callback)
  },

  getServiceList(nameSpace, callback) {
    let url = Toolkit.strFormatter.formatString(this.getUrlForm()['servicelist'], {
      'nameSpace': nameSpace
    })
    this.xhrGetDataEnhanced(url, callback)
  },

  getRCList(nameSpace, callback) {
    let url = Toolkit.strFormatter.formatString(this.getUrlForm()['rclist'], {
      'nameSpace': nameSpace
    })
    this.xhrGetDataEnhanced(url, callback)
  },

  getIngressList(nameSpace, callback) {
    let url = Toolkit.strFormatter.formatString(this.getUrlForm()['ingresslist'], {
      'nameSpace': nameSpace
    })
    this.xhrGetDataEnhanced(url, callback)
  },

  xhrGetData(url, _this, callback) {
    xhr({
      url: url,
      type: 'GET',
      success: (retu_data) => {
        callback(_this, retu_data)
      }
    })
  },

  /**
   * xhrGetData用起来太麻烦，但是并没有限制
   * xhrGetDataEnhanced用起来简单，不需要传入url，但是在实现的时候需要用注意一些点
   */
  xhrGetDataEnhanced(url, callback) {
    xhr({
      url: url,
      type: 'GET',
      success: (retu_data) => {
        callback(retu_data)
      }
    })
  },

  xhrPostData(url, data, callback) {
    xhr({
      url: url,
      type: 'POST',
      data: data,
      success: (retu_data) => {
        callback(retu_data)
      }
    })
  },


  generate_temp_point(i) {
    let temp = []
    for (let j = 0; j < i; j++) {
      temp.push({
        user: Toolkit.getRandomNum(100, 1000),
        sales: Toolkit.getRandomNum(1000, 2000),
        date: j + 10
      })
    }
    return temp
  },

  // 修改这里，定时获取数据并显示
  generateRandomData() {
    let data = {}
    data['pod_total'] = Toolkit.getRandomNum(200, 1000)
    data['pod_used'] = Toolkit.getRandomNum(200, data['pod_total'])
    data['task_total'] = Toolkit.getRandomNum(200, 1000)
    data['task_used'] = Toolkit.getRandomNum(200, data['task_total'])
    data['memory_total'] = Toolkit.getRandomNum(200, 1000)
    data['memory_used'] = Toolkit.getRandomNum(200, data['memory_total'])
    data['load_data_points'] = this.generate_temp_point(10)
    data['flowrate_data_points'] = this.generate_temp_point(10)
    return data
  }

}

export default CalcManageDataRequester