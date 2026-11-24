import React, { createContext, useContext, useMemo, useState } from "react";

// CartContext: satu "gudang" state keranjang yang bisa dipakai semua screen.
// Tanpa ini, details dan orders tidak bisa saling berkomunikasi (kustomisasi tidak pernah sampai ke keranjang).
const CartContext = createContext(null);

// Hook custom: semua screen tinggal panggil useCart() untuk baca/modifikasi keranjang.
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam CartProvider");
  return ctx;
}

export function CartProvider({ children }) {
  // items: array item keranjang. id unik = menuId + kombinasi kustomisasi,
  // supaya menu sama dengan kustomisasi beda tidak tertukar/digabung salah.
  const [items, setItems] = useState([]);

  // addItem: dipanggil dari details.jsx setelah user selesai kustomisasi.
  const addItem = (menuItem, opt) => {
    const cartId = [
      menuItem.id,
      opt.temp,
      opt.milk,
      opt.sugar,
      opt.extraShot ? "shot" : "noshot",
    ].join("|");

    const unitPrice =
      Number(menuItem.price) + opt.milkExtra + (opt.extraShot ? 8000 : 0);

    setItems((prev) => {
      const found = prev.find((it) => it.cartId === cartId);
      if (found) {
        // item + kustomisasi sama sudah ada: cukup tambah qty-nya.
        return prev.map((it) =>
          it.cartId === cartId ? { ...it, qty: it.qty + opt.qty } : it
        );
      }
      return [
        ...prev,
        {
          cartId,
          id: menuItem.id,
          title: menuItem.title,
          desc: `${opt.temp} · ${opt.milk} · ${opt.sugar}${opt.extraShot ? " · Extra Shot" : ""}`,
          price: unitPrice,
          qty: opt.qty,
        },
      ];
    });
  };

  // updateQty: ubah jumlah item; kalau jadi 0, item otomatis keluar dari keranjang.
  const updateQty = (cartId, delta) => {
    setItems((prev) =>
      prev
        .map((it) => (it.cartId === cartId ? { ...it, qty: it.qty + delta } : it))
        .filter((it) => it.qty > 0)
    );
  };

  // clearCart: dipakai setelah checkout sukses.
  const clearCart = () => setItems([]);

  // useMemo agar value tidak dibuat ulang tiap render (mencegah re-render berantai).
  const value = useMemo(() => ({ items, addItem, updateQty, clearCart }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
