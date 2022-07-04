module.exports = function name(admin_id) {
    return function(msg){
        return msg.chat.id == admin_id;
    }
}
