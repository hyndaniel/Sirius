from django.conf.urls import patterns, url

from kd_agent import views

urlpatterns = patterns('',

    url(r'^api/namespaces/(?P<namespace>\w{1,64})/k8soverview$',views.get_k8soverview_info),
    url(r'^api/namespaces/(?P<namespace>\w{1,64})/pods$',views.get_pod_list),
    url(r'^api/namespaces/(?P<namespace>\w{1,64})/services$',views.get_service_list),
    url(r'^api/namespaces/(?P<namespace>\w{1,64})/replicationcontrollers$',views.get_rc_list),
    url(r'^apis/extensions/v1beta1/namespaces/(?P<namespace>\w{1,64})/ingresses',views.get_ingress_list ),

    url(r'^api/namespaces/mytaskgraph$', views.get_mytask_graph),
    url(r'^download/$', views.download),
    url(r'^api/namespaces/mytasklist/getoldrecords', views.mytask_get_old_records),
    url(r'^api/namespaces/mytasklist/checkhasnewrecords', views.mytask_check_has_new_records),
    url(r'^api/namespaces/mytasklist/getnewrecords', views.mytask_get_new_records),

    url(r'^api/clusterinfo/cpu/(?P<minutes>\d{1,5})',views.get_cluster_cpu_info ),
    url(r'^api/clusterinfo/memory/(?P<minutes>\d{1,5})',views.get_cluster_memory_info ),
    url(r'^api/clusterinfo/network/(?P<minutes>\d{1,5})',views.get_cluster_network_info ),
    url(r'^api/clusterinfo/filesystem/(?P<minutes>\d{1,5})',views.get_cluster_filesystem_info ),

    url(r'^api/dashboard/taskinfo', views.dashboard_taskinfo ),

)
