import { saveAs } from 'file-saver'

export default function saveTextAs (textContent, fileName = 'download.txt', charset = 'utf-8') {
  if (typeof window.Blob === 'function') {
    const blob = new Blob([textContent], { type: `text/plain;charset=${charset}` })
    saveAs(blob, fileName)
    return true
  } else {
    let saveTxtWindow = window.frames.saveTxtWindow
    if (!saveTxtWindow) {
      saveTxtWindow = document.createElement('iframe')
      saveTxtWindow.id = 'saveTxtWindow'
      saveTxtWindow.style.display = 'none'
      document.body.insertBefore(saveTxtWindow, null)
      saveTxtWindow = window.frames.saveTxtWindow
      if (!saveTxtWindow) {
        saveTxtWindow = window.open('', '_temp', 'width=100,height=100')
        if (!saveTxtWindow) {
          window.alert('Sorry, download file could not be created.')
          return false
        }
      }
    }

    const doc = saveTxtWindow.document
    doc.open('text/html', 'replace')
    doc.charset = charset
    if (fileName.endsWith('.htm', '.html')) {
      doc.close()
      doc.body.innerHTML = `\r\n${textContent}\r\n`
    } else {
      if (!fileName.endsWith('.txt')) {
        fileName += '.txt'
      }
      doc.write(textContent)
      doc.close()
    }

    const retValue = doc.execCommand('SaveAs', null, fileName)
    saveTxtWindow.close()
    return retValue
  }
}
