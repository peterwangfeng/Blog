/**
 * Created by WangFeng on 2017/1/20 0020.
 */
$('form').submit(function () {
    ev.preventDefault();
   let data = $(this).serialize();
   $.post('/admin/add',data,function (res) {
       $('.modal-body').text(res.message);

       $('#myModal').modal('show').on('hidden.bs.modal',function(e){
           if(res.code == 'success'){
               location.href = "/admin/login"
           }
       })
   })
});
console.log(1);