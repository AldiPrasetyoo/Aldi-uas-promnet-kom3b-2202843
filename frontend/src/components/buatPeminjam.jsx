import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../API/API";

class buatPeminjam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      judul_buku: "",
      jumlah: 0,
      nama_peminjam: "",
      alamat_peminjam: "",
      noHp_peminjam: "",
      tanggal_pinjam: "",
      tanggal_pengembalian: "",
      lama_pinjam: "",
    };
    this.changeJudul_Buku = this.changeJudul_Buku.bind(this);
    this.changeJumlah = this.changeJumlah.bind(this);
    this.changeNama_Peminjam = this.changeNama_Peminjam.bind(this);
    this.changeAlamat_Peminjam = this.changeAlamat_Peminjam.bind(this);
    this.changeNoHp_Peminjam = this.changeNoHp_Peminjam.bind(this);
    this.changeTanggal_Pinjam = this.changeTanggal_Pinjam.bind(this);
    this.changeTanggal_Pengembalian =
      this.changeTanggal_Pengembalian.bind(this);
    this.changeLama_Pinjam = this.changeLama_Pinjam.bind(this);
    this.SimpanOrUpdateInventory = this.SimpanOrUpdateInventory.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "tbh") {
      return;
    } else {
      API.GetPeminjamById(this.state.id).then((res) => {
        let peminjam = res.data;
        this.setState({
          judul_buku: peminjam.judul_buku,
          jumlah: peminjam.jumlah,
          nama_peminjam: peminjam.nama_peminjam,
          alamat_peminjam: peminjam.alamat_peminjam,
          noHp_peminjam: peminjam.noHp_peminjam,
          tanggal_pinjam: peminjam.tanggal_pinjam,
          tanggal_pengembalian: peminjam.tanggal_pengembalian,
          lama_pinjam: peminjam.lama_pinjam,
        });
      });
    }
  }
  SimpanOrUpdateInventory = (e) => {
    e.preventDefault();

    if (
      !this.state.judul_buku ||
      this.state.jumlah <1||
      !this.state.nama_peminjam ||
      !this.state.alamat_peminjam ||
      !this.state.noHp_peminjam ||
      !this.state.tanggal_pinjam ||
      !this.state.tanggal_pengembalian ||
      !this.state.lama_pinjam
    ) {
      alert("Semua field harus diisi dan jumlah minimal 1");
      return;
    }
  
    const tanggalPinjam = new Date(this.state.tanggal_pinjam);
    const tanggalPengembalian = new Date(this.state.tanggal_pengembalian);
  
    if (tanggalPengembalian < tanggalPinjam) {
      alert("Tanggal Pengembalian harus lebih besar dari Tanggal Pinjam");
      return;
    }

    let peminjam = {
      judul_buku: this.state.judul_buku,
      jumlah: this.state.jumlah,
      nama_peminjam: this.state.nama_peminjam,
      alamat_peminjam: this.state.alamat_peminjam,
      noHp_peminjam: this.state.noHp_peminjam,
      tanggal_pinjam: this.state.tanggal_pinjam,
      tanggal_pengembalian: this.state.tanggal_pengembalian,
      lama_pinjam: this.state.lama_pinjam,
    };
    console.log("peminjam => " + JSON.stringify(peminjam));
    if (this.state.id === "tbh") {
      API.CreatePeminjam(peminjam).then((res) => {
        this.props.history.push("/inventory");
        toast.success("Data berhasil disimpan!");
      })
      .catch((error) => {
        toast.error("Gagal menyimpan data. Silakan coba lagi.");
      });
    } else {
      API.UpdatePeminjam(peminjam, this.state.id).then((res) => {
        this.props.history.push("/inventory");
        toast.success("Data berhasil diperbarui!");
      })
      .catch((error) => {
        toast.error("Gagal menyimpan data. Silakan coba lagi.");
      });
    }
  };

  changeJudul_Buku = (event) => {
    this.setState({ judul_buku: event.target.value });
  };
  changeJumlah = (event) => {
    this.setState({ jumlah: event.target.value });
  };
  changeNama_Peminjam = (event) => {
    this.setState({ nama_peminjam: event.target.value });
  };
  changeAlamat_Peminjam = (event) => {
    this.setState({ alamat_peminjam: event.target.value });
  };
  changeNoHp_Peminjam = (event) => {
    this.setState({ noHp_peminjam: event.target.value });
  };
  changeTanggal_Pinjam = (event) => {
    this.setState({ tanggal_pinjam: event.target.value });
  };
  changeTanggal_Pengembalian = (event) => {
    this.setState({ tanggal_pengembalian: event.target.value });
  };
  changeLama_Pinjam = (event) => {
    this.setState({ lama_pinjam: event.target.value });
  };

  cancel() {
    this.props.history.push("/inventory");
  }

  render() {
    return (
      <div className="bungkus bg-100 flex items-center justify-center">
        <div className="bungkusanD p-4 rounded-xl shadow-lg text-center mt-14 sm:mt-12 md:mt-8 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-2/3">
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Peminjaman Buku Perpustakaan Prasetyo
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Judul Buku
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="judul_buku"
                        required
                        value={this.state.judul_buku}
                        onChange={this.changeJudul_Buku}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Jumlah
                    </label>
                    <div className="mt-2 flex items-center justify-center">
                      <input
                        type="number"
                        name="jumlah"
                        value={this.state.jumlah}
                        onChange={this.changeJumlah}
                        className="w-20 md:w-24 text-center py-1.5 rounded-md border-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Nama Peminjam
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="nama_peminjam"
                        value={this.state.nama_peminjam}
                        onChange={this.changeNama_Peminjam}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Alamat
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="alamat_peminjam"
                        value={this.state.alamat_peminjam}
                        onChange={this.changeAlamat_Peminjam}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      No HP
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="noHp_peminjam"
                        value={this.state.noHp_peminjam}
                        onChange={this.changeNoHp_Peminjam}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Tanggal Pinjam
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="tanggal_pinjam"
                        value={this.state.tanggal_pinjam}
                        onChange={this.changeTanggal_Pinjam}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Tanggal Kembali
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="tanggal_pengembalian"
                        value={this.state.tanggal_pengembalian}
                        onChange={this.changeTanggal_Pengembalian}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Lama Pinjam
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lama_pinjam"
                        value={this.state.lama_pinjam}
                        onChange={this.changeLama_Pinjam}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={this.cancel.bind(this)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={this.SimpanOrUpdateInventory}
              >
                Save
              </button>
            </div>
          </form>
          
        <ToastContainer />
        </div>
      </div>
    );
  }
}

export default buatPeminjam;
