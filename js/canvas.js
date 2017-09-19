
window.onload = function () {
    var canVa = document.querySelector('#can');
    var wid = 400;
    var heig = 200;
    canVa.width = wid;
    canVa.height = heig;
    var contex = canVa.getContext("2d");
    var r = 2;
    var mTop = 30; //圆心x轴
    var mLeft = 40; //圆心y轴
    var dataT=[];//存储的时间
    var balls = [];//用于储存新生成的小球
    var colors = ["#3BE","#09C","#A6C","#93C","#9C0","#690","#FB3","#F80","#F44","#C00"];
   (function(){ //最先加载时的时间
        var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
        //存储时间单个数字，由十位小时、个位小时、冒号、十位分钟、个位分钟、冒号、十位秒钟、个位秒钟这7个数成字组
        dataT.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6]);
    })();
    //(2)对时间进行绘制
    function readTime (cxt) {
        cxt.clearRect(0,0,wid,heig)//用于实时的刷新图片
        read( mTop, mLeft, dataT[0],contex)
        read( mTop+15*(r+1),mLeft,dataT[1],contex);
        read( mTop+30*(r+1),mLeft,10,cxt)
        read( mTop+40*(r+1),mLeft,dataT[3],contex);
        read( mTop+55*(r+1),mLeft,dataT[4],contex);
        read( mTop+70*(r+1),mLeft,10,cxt)
        read( mTop+80*(r+1),mLeft,dataT[6],contex);
        read( mTop+95*(r+1),mLeft,dataT[7],contex);
        //执行read函数；每个小点的最大绘图直径为2*(r+1)，每个数字的最大绘图直径为14*(r+1)注:因为数组中有7个值（但是要排除掉第十个二维数组）
        upData()
        //（7）绘制彩色小球
        for(var i=0;i<balls.length;i++){
            cxt.fillStyle = balls[i].color;
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,r,0,2*Math.PI)
            cxt.closePath();
            cxt.fill();
        };
    };
    //（3）绘制点阵
    function read( x,y,mun,cxt){  //x,y 为原点坐标,mun要显示的数字 cxt为canvas的上下文作用环境
        cxt.fillStyle ='blue';
        for(var i=0;i<data[mun].length;i++){
        //循环三维数组中的第几个二维数组,i表示二维数组中有几个三维数组 j表示三维数组中的每一个值
            for(var j=0;j<data[mun][i].length;j++){
                if(data[mun][i][j]==1){ //判断三维素组中的值是否等1，如果相等那么绘制圆点
                    cxt.beginPath();
                    cxt.arc(x+j*2*(r+1)+(r+1),y+i*2*(r+1)+(r+1),r,0,2*Math.PI);
                    cxt.closePath();
                    cxt.fill()
                };
            };
        };
    };
    //（4）状态更新
    function upData(){
        //获取当前的时间，并且获取到：时，分，秒
        var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
        var datanT = [];
        var changeNum =[];
        datanT.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6]);
        for(var i =0;i<dataT.length;i++){
            if(datanT[i]!==dataT[i]){
                if(dataT[0] != datanT[0]){
                    addballs(mTop, mLeft, dataT[0])
                };
                if(dataT[1] != datanT[1]){
                    addballs(mTop+15*(r+1),mLeft,dataT[1]);
                };
                if(dataT[3] != datanT[3]){
                    addballs(mTop+40*(r+1),mLeft,dataT[3])
                };
                if(dataT[4] != datanT[4]){
                    addballs(mTop+55*(r+1),mLeft,dataT[4])
                };
                if(dataT[6] != datanT[6]){
                    addballs(mTop+80*(r+1),mLeft,dataT[6])
                };
                if(dataT[7] != datanT[7]){
                    addballs(mTop+95*(r+1),mLeft,dataT[7])
                };
                //判断给变的值并且执行addballs函数
                dataT=datanT;//时间改变将该变的时间赋dataT数组
            };
        };
        motion();
    };
    //(5)当事件给变是在相应的数字上生成小球对象
    function addballs(x,y,mun){
        for(var i=0;i<data[mun].length;i++){
            for(var j=0;j<data[mun][i].length;j++){
                if(data[mun][i][j]==1){
                    var aBall = {
                        x:x+j*2*(r+1)+(r+1),
                        y:y+i*2*(r+1)+(r+1),
                        g:1.5+Math.random(),
                        vx:Math.pow(-1,Math.ceil(Math.random()*1000))*2,
                        vy:-5,
                        color:colors[Math.floor(Math.random()*colors.length)]
                    };
                    balls.push(aBall)
                };
            };
        };
    };
    //（6）小球的物理运动
    function motion(){
        for(var i=0;i<balls.length;i++){
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g
            if(balls[i].y>=heig-r){
                balls[i].y=heig-r;
                balls[i].vy=-balls[i].vy*0.5;
            };
        };
        var len =0;
        for(var i =0;i<balls.length;i++){
            if(balls[i].x+r>0 && balls[i].x-r<wid){
                balls[len++] = balls[i]
            };
        };
        while(balls.length>len){
            balls.pop()
        };
    };
    //执行动画
        readTime(contex);
        setInterval(function(){
           readTime (contex);
           upData();
        },100)
}
