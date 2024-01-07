import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../API/API";
import fotoP from "../assets/img/people.png";
import fotoT from "../assets/img/document.png";

class daftarPeminjam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: [],
      totalPeminjam: 0,
      searchQuery: "",
      cariInventory: [],
      currentPage: 1,
      recordsPerPage: 4,
      isDeleteModalOpen: false,
      deletingItemId: null,
    };
    this.tambahPeminjam = this.tambahPeminjam.bind(this);
    this.updatePeminjam = this.updatePeminjam.bind(this);
    this.DeletePeminjam = this.DeletePeminjam.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  DeletePeminjam(id) {
    this.openDeleteModal(id);
    API.DeletePeminjam(id).then((res) => {
      const updatedInventory = this.state.inventory.filter(
        (Peminjam) => Peminjam.id !== id
      );
      this.setState({
        inventory: this.state.inventory.filter(
          (Peminjam) => Peminjam.id !== id
        ),
        cariInventory: this.state.cariInventory.filter(
          (Peminjam) => Peminjam.id !== id
        ),
      });

      const totalPeminjam = Math.max(updatedInventory.length, 0);
      const totalBuku = this.state.inventory.reduce(
        (acc, Peminjam) => acc + Peminjam.jumlah,
        0
      );

      this.setState({ totalPeminjam, totalBuku });
      toast.info("Data berhasil dihapus!");
    });
  }

  openDeleteModal(id) {
    this.setState({
      isDeleteModalOpen: true,
      deletingItemId: id,
    });
  }

  closeDeleteModal() {
    this.setState({
      isDeleteModalOpen: false,
      deletingItemId: null,
    });
  }

  lihatPeminjam(id) {
    this.props.history.push(`/lihatPeminjam/${id}`);
  }
  updatePeminjam(id) {
    this.props.history.push(`/tambahPeminjam/${id}`);
  }

  componentDidMount() {
    API.GetPeminjam().then((res) => {
      if (res.data == null) {
        this.showEmptyDataToast();
      }
      let inventoryData = res.data || [];

      let totalBukuDipinjam =
        inventoryData.length > 0
          ? inventoryData.reduce((acc, Peminjam) => acc + Peminjam.jumlah, 0)
          : 0;

      this.setState({
        inventory: inventoryData,
        totalPeminjam: inventoryData.length,
        totalBuku: totalBukuDipinjam,
        cariInventory: inventoryData,
      });
    });
  }

  showEmptyDataToast() {
    toast.info("Data peminjam kosong", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }
  tambahPeminjam() {
    this.props.history.push("/tambahPeminjam/tbh");
  }
  handleSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSearch() {
    const { inventory, searchQuery } = this.state;
    const cariInventory = inventory.filter((Peminjam) =>
      Peminjam.nama_peminjam.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ cariInventory, currentPage: 1 });
  }
  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const {
      isDeleteModalOpen,
      deletingItemId,
      cariInventory,
      currentPage,
      recordsPerPage,
    } = this.state;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = cariInventory.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

    const renderRecords = currentRecords.map((Peminjam) => (
      <tr key={Peminjam.id}>
        <td>{Peminjam.judul_buku}</td>
        <td>{Peminjam.jumlah}</td>
        <td>{Peminjam.nama_peminjam}</td>
        <td>{Peminjam.alamat_peminjam}</td>
        <td>{Peminjam.noHp_peminjam}</td>
        <td>{Peminjam.tanggal_pinjam}</td>
        <td>{Peminjam.tanggal_pengembalian}</td>
        <td>{Peminjam.lama_pinjam}</td>
        <td>
          <button
            onClick={() => this.updatePeminjam(Peminjam.id)}
            className="text-green-500 hover:underline"
          >
            <i className="fas fa-edit"></i> Update
          </button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => this.openDeleteModal(Peminjam.id)}
            className="text-red-500 hover:underline"
          >
            <i className="fas fa-trash-alt"></i> Delete
          </button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => this.lihatPeminjam(Peminjam.id)}
            className="text-blue-500 hover:underline"
          >
            <i className="fas fa-eye"></i> View
          </button>
        </td>
      </tr>
    ));

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(cariInventory.length / recordsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    return (
      <div className="bungkus bg-100 flex items-center justify-center">
        <br></br>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="Card rounded-lg shadow-md p-2">
            <div className="isiCard flex items-center justify-center">
              <img
                src={fotoP}
                alt="peminjam"
                className="w-12 h-12 sm:w-16 h-16"
              />
              <div className="text-center ml-2">
                <h3 className="text-lg sm:text-2xl font-bold">
                  Total Peminjam
                </h3>
                <h1 className="jumlahTP text-lg sm:text-xl font-semibold">
                  {this.state.totalPeminjam}
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <button
              className="tambahI text-black font-bold py-2 px-4 rounded"
              onClick={this.tambahPeminjam}
            >
              Tambah Peminjam
            </button>
          </div>
          <div className="Card rounded-lg shadow-md p-2">
            <div className="isiCard flex items-center justify-center">
              <img src={fotoT} alt="Telat" className="w-12 h-12 sm:w-16 h-16" />
              <div className="text-center ml-2">
                <h3 className="text-lg sm:text-2xl font-bold">
                  Total Buku Dipinjam
                </h3>
                <h1 className="jumlahTP text-lg sm:text-xl font-semibold">
                  {this.state.totalBuku}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="bungkusan p-2 rounded-xl shadow-lg text-center mt-4">
          <div className="container mx-auto">
            <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-4 mb-4">
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Cari nama peminjam..."
                  value={this.state.searchQuery}
                  onChange={this.handleSearchChange}
                  className=" border border-black rounded bg-white"
                />
                <button
                  onClick={this.handleSearch}
                  className="btn btn-primary ml-4"
                >
                  Cari
                </button>
              </div>
              <h2 className="text-2xl font-bold">Data Pinjaman</h2>
              <div className="overflow-x-auto">
                <table className="responsive-table min-w-full bg-white border border-gray-900">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-black">
                        Judul Buku
                      </th>
                      <th className="py-2 px-4 border-b border-black">
                        Jumlah
                      </th>
                      <th className="py-2 px-4 border-b border-black">
                        Nama Peminjam
                      </th>
                      <th className="py-2 px-4 border-b border-black">
                        Alamat Peminjam
                      </th>
                      <th className="py-2 px-4 border-b border-black">
                        No. HP Peminjam
                      </th>
                      <th className="py-2 px-4 border-b border-black">
                        Tanggal Pinjam
                      </th>
                      <th className="py-2 px-4 border-b border-black">
                        Tanggal Pengembalian
                      </th>
                      <th className="py-2 px-4 border-b border-black">
                        Lama Pinjam
                      </th>
                      <th className="py-2 px-4 border-b border-black">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>{renderRecords}</tbody>
                </table>
              </div>
              <div className="flex justify-center">
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => this.handlePageChange(number)}
                    className={`m-2 p-2 bg-gray-300 rounded ${
                      currentPage === number ? "bg-gray-500 text-white" : ""
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              {isDeleteModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span
                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Konfirmasi Hapus
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Apakah Yakin Ingin Menghapus Peminjam Ini? Pastikan
                            Buku Sudah Di Kembalikan
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          onClick={() => {
                            this.DeletePeminjam(deletingItemId);
                            this.closeDeleteModal();
                          }}
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Hapus
                        </button>
                        <button
                          onClick={() => this.closeDeleteModal()}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default daftarPeminjam;
