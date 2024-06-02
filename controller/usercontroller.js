var stu = require('../model/student');
var staff = require('../model/staff');
var sresult = require('../model/result');
const bcrypt = require('bcrypt');
var storage = require('node-persist');
storage.init();
exports.stuadd = async (req, res) => {
    try {
        var b_pass = await bcrypt.hash(req.body.password, 10);
        req.body.password = b_pass;
        var data = await stu.create(req.body);
        res.status(200).json({
            data
        })
    }
    catch (err) {
        res.status(500).json({
            err
        }
        )
    }

}
exports.stuview = async (req, res) => {
    var data = await stu.find().populate('result_id');
    res.status(200).json({ 
        data
    })
}
exports.stuup = async (req, res) => {
    var data = await stu.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        data
    })
}
exports.studel = async (req, res) => {
    var data = await stu.findByIdAndDelete(req.params.id);
    res.status(200).json({
        data
    })
}
exports.staffadd = async (req, res) => {
    try {
        b_pass = await bcrypt.hash(req.body.password, 10);
        req.body.password = b_pass;
        var data = await staff.create(req.body);
        res.status(200).json({

            data
        })
    }
    catch (err) {
        res.status(500).json({
            err
        }
        )
    }

}
exports.staffview = async (req, res) => {
    var data = await staff.find();
    res.status(200).json({
        data
    })
}
exports.staffup = async (req, res) => {
    var data = await staff.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        data
    })
}
exports.staffdel = async (req, res) => {
    var data = await staff.findByIdAndDelete(req.params.id);
    res.status(200).json({
        data
    })
}
exports.addresult = async (req, res) => {
    var s1 = parseInt(req.body.sub1);
    var s2 = parseInt(req.body.sub2);
    var s3 = parseInt(req.body.sub3);
    var s4 = parseInt(req.body.sub4);
    var s5 = parseInt(req.body.sub5);
    req.body.total = parseInt(s1)+parseInt(s2)+parseInt(s3)+parseInt(s4)+parseInt(s5);
    req.body.per = (parseInt(s1)+parseInt(s2)+parseInt(s3)+parseInt(s4)+parseInt(s5)) / 5;
    req.body.max = Math.max(s1, s2, s3, s4, s5);
    req.body.min = Math.min(s1, s2, s3, s4, s5);
    var per = (s1 + s2 + s3 + s4 + s5) / 5;
    if (per > 33) {
        req.body.result = "pass"
    }
    else {
        req.body.result = "fail"

    }
    var data = await sresult.create(req.body);
    res.status(200).json({
        data
    })
}
exports.viewresult = async (req, res) => {
    var data = await sresult.find().populate('stu_id');
    res.status(200).json({
        data
    })
}
exports.upresult = async (req, res) => {
    var data = await sresult.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        data
    })
}
exports.delresult = async (req, res) => {
    var data = await sresult.findByIdAndDelete(req.params.id);
    res.status(200).json({
        data
    })
}
exports.stafflogin = async (req, res) => {
    try {
        var staff_status = await storage.getItem('stafflogin');
        if (staff_status == undefined) {
            var data = await staff.find({ s_email: req.body.s_email });
            if (data.length == 1) {
                bcrypt.compare(req.body.password, data[0].password, async function (error, result) {
                    if (result == true) {
                        await storage.setItem('stafflogin', data[0].id);
                        res.status(200).json({
                            message: 'staff login'
                        })
                    } else {
                        res.status(200).json({
                            message: 'staff login failed'
                        })
                    }
                })
            } else {
                res.status(200).json({
                    message: 'staff already login'
                })
            }
        }
    } catch (error) {
        res.status(200).json({
            error
        })
    }

}
exports.stafflogout = async (req, res) => {
    await storage.clear('stafflogin');
    res.status(200).json({
        msg: "logout success"
    })
}
exports.stulogin = async (req, res) => {
    // try {
        var std_status = await storage.getItem('stulogin');
        if (std_status == undefined) {
            var data = await stu.find({ s_email: req.body.s_email });
            if (data.length == 1) {
                bcrypt.compare(req.body.password, data[0].password, async function (erro, result) {
                    if (result == true) {
                        await storage.setItem('stulogin', data[0].id);
                        res.status(200).json({
                            message: "student login"
                        })
                    } else {
                        res.status(200).json({
                            message: "student login failed"
                        })
                    }
                });
            } else {
                res.status(200).json({
                    message: "student already login"
                })
            }
        }
    // } catch (error) {
    //     res.status(200).json({
    //         error
    //     })
    // }

}
exports.stulogout = async (req, res) => {
    await storage.clear('stulogin');
    res.status(200).json({
        msg: "logout success"
    })
}
exports.stdwise = async (req, res) => {
        var dat = req.body.standard;
        var data = await stu.find({std:dat}).populate('result_id');  
        res.status(200).json({
            data
        })
}
