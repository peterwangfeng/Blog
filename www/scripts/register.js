/**
 * Created by WangFeng on 2017/1/19 0019.
 */

$('form').submit(function(ev){
    ev.preventDefault();
    console.log(1);
    var pass = $(':password').map(function(){
        return $(this).val()
    });
    console.log(pass);
    if(pass[0] == pass[1]){
        let data = $(this).serialize();
        $.post('/register',data,function(res){
            $('.modal-body').text(res.message);

            $('#myModal').modal('show').on('hidden.bs.modal',function(e){
                if(res.code == 'success'){
                    location.href = "/admin/login"
                }
            })
        })

    }
    else{
        $('.modal-body').text('密码错误')
        $('#myModal').modal('show')
    }
});
