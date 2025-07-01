'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Siswa } from '../types/siswa'

export default function Home() {
  const [form, setForm] = useState<Omit<Siswa, 'id' | 'created_at'>>({
    nama_lengkap: '',
    tingkat_kelas: '',
    alamat: '',
  })

  const [siswaList, setSiswaList] = useState<Siswa[]>([])

  const fetchSiswa = async () => {
    const { data, error } = await supabase.from('siswa').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('Gagal mengambil data:', error.message)
    }
    if (data) setSiswaList(data)
  }

  const handleSubmit = async () => {
    if (!form.nama_lengkap || !form.tingkat_kelas || !form.alamat) return;
    const { error } = await supabase.from('siswa').insert([form])
    if (error) {
      console.error('Gagal menambah data:', error.message)
    } else {
      setForm({ nama_lengkap: '', tingkat_kelas: '', alamat: '' })
      fetchSiswa()
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('siswa').delete().eq('id', id)
    if (error) {
      console.error('Gagal menghapus data:', error.message)
    } else {
      fetchSiswa()
    }
  }

  useEffect(() => {
    fetchSiswa()
  }, [])

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">Data Siswa</h1>

      <input
        value={form.nama_lengkap}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, nama_lengkap: e.target.value })}
        placeholder="Nama Lengkap"
        className="border p-2 w-full mb-2"
      />
      <input
        value={form.tingkat_kelas}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, tingkat_kelas: e.target.value })}
        placeholder="Tingkat Kelas"
        className="border p-2 w-full mb-2"
      />
      <input
        value={form.alamat}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, alamat: e.target.value })}
        placeholder="Alamat"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Tambah Siswa
      </button>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">Nama</th>
            <th className="border px-2 py-1">Kelas</th>
            <th className="border px-2 py-1">Alamat</th>
            <th className="border px-2 py-1">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswaList.map((siswa) => (
            <tr key={siswa.id}>
              <td className="border px-2 py-1">{siswa.nama_lengkap}</td>
              <td className="border px-2 py-1">{siswa.tingkat_kelas}</td>
              <td className="border px-2 py-1">{siswa.alamat}</td>
              <td className="border px-2 py-1">
                <button onClick={() => handleDelete(siswa.id)} className="text-red-500">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
