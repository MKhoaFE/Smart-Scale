import React from 'react'

export const botTelegram = () => {
    const token = "7466908078:AAHJm7ZsIN1pZw81s1Y--4n4_w7PIbNx6ME";
    const chat_id = -4580422151;
    const my_text = `test result`
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${my_text}`
  return (
    <div>botTelegram</div>
  )
}
