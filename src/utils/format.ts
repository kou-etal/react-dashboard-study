export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount)
}
//newはクラスのインスタンス化。Intl.NumberFormatの部分が標準化に関するクラス。
/*const formatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
})
  //Intlはbuilt-inゆえにimportなしで使える。

formatter.format(amount)*/
//utilsは便利な関数共有。hooksは状態に関する関数共有。
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateString))
}
