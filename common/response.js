function response(success=true,message="请求成功",data=[]) {

    if(!success&&message==="请求成功"){
        message="请求失败";
    }
    this.meta={
        "success": success,
        "message": message
    };
    this.data=data;
}
module.exports = response;