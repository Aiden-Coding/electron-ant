const TAG = '## TokenDao: ';
 
class TokenDao {
 
    constructor(db) {
        this.db = db;
        this.saveUserToken = this.saveUserToken.bind(this);
    }
 
    getUserToken(username,appType){
        var stmt = this.db.prepare('select userID,username,tokenString from UserToken where username=? and appType=?');
        var row = stmt.get(username,appType);
        console.log('getUserToken: '+JSON.stringify(row));
        return row;
    }
 
    saveUserToken(username,appType,tokenString ) {
        console.log(this,username,appType,tokenString)
        var stmt = this.db.prepare('select userID,username,tokenString from UserToken where username=? and appType=?');
        var row = stmt.get(username,appType);
        if(row){
            console.log('存在，则更新');
            //存在，则更新
            var stmt = this.db.prepare("update UserToken set tokenString = ? where username=? and appType=?");
            stmt.run(tokenString,username, appType);
            console.log('成功1');
        }else{
            console.log('不存在，则插入');
            //不存在，则插入
            var stmt = this.db.prepare("INSERT INTO UserToken (userName,appType,tokenString) VALUES (?,?,?)");
            stmt.run(username, appType,tokenString);
            console.log('成功');
        }
    }
}
 
module.exports = TokenDao;