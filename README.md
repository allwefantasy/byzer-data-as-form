# Byzer Data as Form

Byzer Data as Form 是一款集 Form 发布，管理和使用的 产品。
他的使命是 **Help People Deliver Data Value**。

> [传递数据的价值- Byzer Data-as-Form](https://zhuanlan.zhihu.com/p/516070378)

## 在线体验（需要保证外网访问速度）

https://byzer.org/form

## 部署

### 前置条件
1. [部署 Byzer 语言引擎](https://docs.byzer.org/#/byzer-lang/zh-cn/installation/README)
2. [部署 Byzer Notebook](https://docs.byzer.org/#/byzer-notebook/zh-cn/installation/prerequisites) 
3. 初始化 MySQL 数据库(最好是5.7版本的)，数据库 schema 在根目录下的 db/db.sql

### 项目打包

运行根项目下的脚本（请确保 github 访问顺畅）：

```
git clone https://github.com/allwefantasy/byzer-data-as-form
cd byzer-data-as-form
./dev/package.sh
```

### 配置文件
      

将 release/config 目录下的 `application-example.yml` 改成  `application.yml`。值得注意的配置：

1. 数据库链接需要改动
2. admin_token 需要在配置文件里配置，请随机生成一个 UUID。
3. notebookAccessToken 是为了让该应用能够访问 Byzer Notebook
4. storage 需要配置一个路径，用于存放 插件文件以及图片文件。
5. domain 默认为 http://market.byzer.org/form，该域名用来生成提供图片链接
6. fileSizeLimit: 1m  可以配置上传图片的大小 默认为100m，推荐设置为5m 以内。

### 项目启动

在 release 目录的发行版里，运行 `./bin/start.sh` 进行启动。

启动后访问：`http://127.0.0.1:9007/web/#/api/list`查看界面。

### 启动后配置

首先我们填写网站信息：

可以通过地址： http://127.0.0.1:9007/#/api/list 查看所有可用的API。 我们第一步是使用/config/home API 对站点进行配置

![](./images/img.png)

一个填写例子：

![](./images/img_2.png)

此时项目主页应该是可以正常显示了,显示的内容如下：

![](./images/img_1.png)
                         
接着我们需要开放注册支持，让内部用户可以自己进行注册,  可以访问地址： `http://xxxx/web/#/api/view?action=controlReg`

![](./images/img_3.png)

允许用户进行注册。

注意，注册用户需要通过审核才能处于【激活】状态。 没有通过审核的用户无法登录。

你可以通过如下 API 进行审核：

![](./images/img_5.png)

点击进去后可以查看所有到所有没有被审核的用户。注意查看这些信息需要你有管理员权限，也就是需要填写 `admin_token`,该 token 配置在 `application.yml`
文件里。

接着找到 `/usr/activate` API,进入，然后填写需要激活的用户即可。 


## Form 制作

在 Byzer Notebook 中， 开发如下代码：

```
set FORM_VISIBILITY = "__PUBLIC__";
-- set VISIBILITY = "user:jack";
-- set VISIBILITY = "team:byzer > role:dev";
-- set VISIBILITY = "team:byzer > role:dev,team:byzer > role:";

set title = "快递查询帅气" where type="defaultParam" and formType="title" ;

set trackingNumbers="99992837379" where type="defaultParam" and formType="input" and label="快递单号，多个请用逗号分隔";

set trackingType="0" where type="defaultParam" and formType="select" and label="快递类型" and textProvider="接受,发送;0,1";

set trackingNum="1,2,3";
set trackingNum=`select concat_ws(",",transform(split("${trackingNumbers}",","),value-> concat('"',value,'"')))` where type="sql" and mode="runtime";

connect jdbc where
 url="jdbc:mysql://127.0.0.1:3306/wow?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&tinyInt1isBit=false"
 and driver="com.mysql.jdbc.Driver"
 and user="xxxxx"
 and password="xxxxx"
 as mysql_instance;
 
 
 
load jdbc.`mysql_instance.trackers` as temptable; 

select trackingNumber as `订单号`,msg as `状态`, 
case receive when 0 then "接收" else "发送" end
as `类型` 
from temptable 
where trackingNumber in (${trackingNum}) 
and  receive=${trackingType}
as output;
```

第一行变量是设置表单可访问性的，也就是我们设计的表单谁可以访问，我们后续会有详细章节介绍可见性设置。 当其值为 `__PUBLIC__`  时，表示所有 Data-as-Form 平台的用户都可以访问到你的表单。
如果你只希望特定用户使用呢？
                   
```
set FORM_VISIBILITY = "user:jack";
```


多个用户可以使用逗号分隔。比如 `user:jack,william`

如果只希望某个 team 下的某个 role 使用：

```
set FORM_VISIBILITY = "team:byzer > role:dev";
```

同一组下的多个 role:

```
set FORM_VISIBILITY = "team:byzer > role:dev, team:byzer > role:admin";
```

不同组的不同 role:

```
set FORM_VISIBILITY = "team:byzer > role:dev, team:kylin > role:admin";
```


表单类型截止目前支持：

1. Input
2. Select

其他的表单类型我们会持续增加。
其中 Select 支持下拉列表的静态配置和动态配置：

1. textProvider  如前文中的   textProvider="接受,发送;0,1";
2.  sqlProvider  比如从数据库表中动态加载下拉选项框。

sqlProvider的一个示例用法：
       
```sql
set trackingType="0" where 
type="defaultParam" 
and formType="select" 
and label="快递类型" 
and sqlProvider='''
select "接受" as key, 0 as value 
union select "发送" as key, 1 as value 
as output;
''';
```

上面的代码可以达到和静态配置一样的效果。

开发完成后，记录下该 notebook的 id, 假设为 48, 此时可以进 Data As Form 平台上进行表单发布，先登录。

![](./images/img_6.png)


点击 Publish Form 后进入发布界面：

![](./images/img_7.png)

填写表单的一些信息，该表单就会出现在主界面。








