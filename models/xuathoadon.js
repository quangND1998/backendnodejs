const sql = require('./dbconnect');

const  XuatHoaDon = function(xuathoadon){
    this.TenKH = xuathoadon.TenKH;
    this.DiaChiB= xuathoadon.DiaChiB;
    this.MaSTB =xuathoadon.MaSTB;
    this.MaSP = xuathoadon.MaSP;
    this.TenSP  = xuathoadon.TenSP;
    this.DVT = xuathoadon.DVT;
    this.SoLuong = xuathoadon.SoLuong;
    this.Gia = xuathoadon.Gia;
    this.NgayLap = xuathoadon.NgayLap;
    this.VAT = xuathoadon.VAT;
    this.Amount = xuathoadon.Amount;
    
}

XuatHoaDon.findById =(xuatHoaDonId ,result)=>{
    sql.query(`SELECT * FROM viewsanphamhoadon WHERE MaSTB ='${xuatHoaDonId}'`,(err,res)=>{
        if(err){
            console.log("error", err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found recipt:",res);
            result(null,res);
            return;
        }
        result({kind:"not found"}, null)
    });
};


module.exports = XuatHoaDon;