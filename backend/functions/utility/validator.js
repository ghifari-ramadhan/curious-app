module.exports.validateRegisterInput = (
    username,
    password,
    birthday,
    gender,
    mobileNumber,
    email
) => {
    const errors = {};
    const reg = /^(?=[a-zA-Z0-9.]{3,20}$)[a-zA-Z0-9]+\.?[a-zA-Z0-9]+$|^.*@\w+\.[\w.]+$/;
    if(!username.match(reg)) errors.username = 'username tidak bisa mengunakan simbol atau spasi, silahkan coba lagi';
    if(username.trim() === '') errors.username = 'username tidak boleh kosong';
    if(gender.trim() === '') errors.gender = 'gender tidak boleh kosong';
    if(birthday.trim() === '') errors.birthday = 'birthday tidak boleh kosong';
    if(mobileNumber.trim() === '') errors.mobileNumber = 'nomor telefon tidak boleh kosong';
    if(password === '') errors.password = "password tidak boleh kosong";

    if(email.trim() === ''){
        errors.email = 'email tidak boleh kosong';
    } else {
        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!email.match(regEx)) {
            errors.email = "format email tidak valid"
        }
    }
    console.log(errors);
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}