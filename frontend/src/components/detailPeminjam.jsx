import React, { Component } from "react";
import API from "../API/API";

class detailPeminjam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      peminjam: {},
    };
  }

  componentDidMount() {
    API.GetPeminjamById(this.state.id).then((res) => {
      this.setState({ peminjam: res.data });
    });
  }

  render() {
    return (
      <div className="bungkus bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bungkusanD w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-2/3 rounded-xl shadow-lg text-center mt-4 sm:mt-2 md:mt-4">
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-6">Data Peminjam</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4 sm:mb-0">
                <label className="text-gray-900">Nama Peminjam:</label>
                <div className="text-gray-900">
                  {this.state.peminjam.nama_peminjam}
                </div>
              </div>
              <div className="mb-4 sm:mb-0">
                <label className="text-gray-900">Alamat Peminjam:</label>
                <div className="text-gray-900">
                  {this.state.peminjam.alamat_peminjam}
                </div>
              </div>
              <div>
                <label className="text-gray-900">No Hp Peminjam:</label>
                <div className="text-gray-900">
                  {this.state.peminjam.noHp_peminjam}
                </div>
              </div>
            </div>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4 sm:mb-0">
                <label className="text-gray-900">
                  Judul Buku yang Dipinjam:
                </label>
                <div className="text-gray-900">
                  {this.state.peminjam.judul_buku}
                </div>
              </div>
              <div className="mb-4 sm:mb-0">
                <label className="text-gray-900">
                  Jumlah Buku yang Dipinjam:
                </label>
                <div className="text-gray-900">
                  {this.state.peminjam.jumlah}
                </div>
              </div>
              <div className="mb-4 sm:mb-0">
                <label className="text-gray-900">Tanggal Pinjam:</label>
                <div className="text-gray-900">
                  {this.state.peminjam.tanggal_pinjam}
                </div>
              </div>
              <div className="mb-4 sm:mb-0">
                <label className="text-gray-900">Tanggal Pengembalian:</label>
                <div className="text-gray-900">
                  {this.state.peminjam.tanggal_pengembalian}
                </div>
              </div>
              <div>
                <label className="text-gray-900">Lama Peminjaman:</label>
                <div className="text-gray-900">
                  {this.state.peminjam.lama_pinjam}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default detailPeminjam;
