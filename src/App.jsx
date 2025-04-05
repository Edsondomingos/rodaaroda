import { useState } from 'react'
import './App.css'

function App() {

  const [palavras, setPalavras] = useState([])
  const [palavrasRemovidas, setPalavrasRemovidas] = useState([])
  const [palavra, setPalavra] = useState('')
  const [dica, setDica] = useState('')
  const [palavraAtual, setPalavraAtual] = useState('')
  const [dicaAtual, setDicaAtual] = useState('')
  const [letra, setLetra] = useState('')
  const [letrasEncontradas, setLetrasEncontradas] = useState([])
  const [arriscar, setArriscar] = useState(false)
  const [arriscarPalavra, setArriscarPalavra] = useState('')
  const [verificaLetra, setVerificaLetra] = useState('')
  const [addJogo, setAddJogo] = useState(true)
  const [indicePalavra, setIndicePalavra] = useState(null)

  const verificar = (e) => {
    let letraEncontrada = letrasEncontradas
    for (let i = 0; i < palavraAtual.length; i++) {
      if (e == palavraAtual[i]) {
        if (!letraEncontrada.includes(i)) letraEncontrada.push(i)
        setLetrasEncontradas(letraEncontrada)
      }
    }

    if (!palavraAtual.includes(e)) {
      setVerificaLetra('X')
    }

    setTimeout(() => setLetra(''), 1500)
    setTimeout(() => setVerificaLetra(''), 1500)
  }

  const addPalavraDica = () => {
    const arr = palavras
    if (palavra !== '' && dica !== '') {
      arr.push([palavra, dica])
      setPalavras(arr)
      setPalavra('')
      setDica('')
    }
  }

  const atualizarpalavra = () => {
    if (palavras.length > 0) {
      const arr = palavras
      const arrRemovidos = palavrasRemovidas
      let palavraRemovida = arr.splice(indicePalavra, 1)
      setPalavras(arr)
      arrRemovidos.push(palavraRemovida)
      setPalavrasRemovidas(arrRemovidos)
      if (palavras.length > 0) {
        let indice = Math.floor(Math.random() * (palavras.length))
        setIndicePalavra(indice)
        setPalavraAtual(palavras[indice][0])
        setDicaAtual(palavras[indice][1])
      } else {
        setAddJogo(true)
      }
    } else {
      setPalavraAtual('')
      setDicaAtual('')
    }
  }

  const reutilizar = () => {
    const arr = palavras
    if (palavrasRemovidas.length > 0) {
      for (let i = 0; i < palavrasRemovidas.length; i++) {
        arr.push(palavrasRemovidas[i])
      }
      setPalavrasRemovidas([])
      setPalavras(arr)
    }
  }

  const restart = () => {
    const result = confirm('Reiniciar todo o jogo do zero? Tem certeza?')
    if (result) {
      setPalavras([])
      setPalavrasRemovidas([])
      setPalavraAtual('')
      setDicaAtual('')
      setAddJogo(true)
    }
  }

  return (
    <>

      <section className="ajuda centralizar">
        <button title='Ajuda: Entenda o jogo'>?</button>
        <button title='Nova palavra' onClick={atualizarpalavra}>@</button>
        <button title='Reutilizar palavras' onClick={reutilizar}>#</button>
        <button title='Começar tudo do zero' onClick={restart}>0</button>
      </section>

      <section className="palavra centralizar">
        {
          addJogo == false && (
            <><div className='palavra-container centralizar'>


              {
                palavraAtual.split('').map((letra, index) => {
                  return (
                    letrasEncontradas.indexOf(index) === -1 ?
                      <p className='palavra-espaco' key={index}>{letra}</p>
                      :
                      <p className='palavra-letra' key={index}>{letra}</p>
                  )

                })
              }
            </div>
              <p className="palavra-dica">{dicaAtual}</p>
              <input type="text"
                maxLength='1'
                minLength='1'
                className='palavra-letra-escolhida'
                value={letra} onChange={e => {
                  setLetra(e.target.value.toUpperCase())
                  verificar(e.target.value.toUpperCase())
                }} />
              <p className='palavra-sem-letra'>{verificaLetra}</p>
              <div className='palavra-fim-container centralizar'>
                <p>{palavraAtual.length} letras</p>
                {
                  arriscar ?
                    <>
                      <input type="text"
                        value={arriscarPalavra} onChange={e => {
                          setArriscarPalavra(e.target.value.toUpperCase())
                        }} />
                      <button onClick={() => {
                        if (arriscarPalavra === palavraAtual) {
                          setArriscar(false)
                        }
                        for (let i = 0; i < palavraAtual.length; i++) {
                          verificar(arriscarPalavra[i])
                        }
                      }}>Arriscar Palavra</button>
                    </>
                    :
                    <button onClick={() => {
                      if (palavras.length > 0) setArriscar(true)
                    }}>Arriscar Palavra</button>
                }
              </div></>
          )
        }
      </section>

      <section className="roleta centralizar">
        {
          addJogo ?
            <div className='add-palavras centralizar'>
              <input type="password" placeholder='Palavra' value={palavra} onChange={e => setPalavra(e.target.value.toUpperCase())} />
              <input type="password" placeholder='Dica' value={dica} onChange={e => setDica(e.target.value.toUpperCase())} />
              <button onClick={() => addPalavraDica()}>Adicionar</button>
              <button onClick={() => {
                if (palavras.length > 0) {
                  let indice = Math.floor(Math.random() * (palavras.length))
                  setIndicePalavra(indice)
                  setPalavraAtual(palavras[indice][0])
                  setDicaAtual(palavras[indice][1])
                  setAddJogo(false)
                }
              }}>Sem mais palavras ou dicas</button>
            </div>
            :
            // <div className="roleta-circulo">
            //   <p className="roleta-opcao premio1 centralizar">100</p>
            //   <p className="roleta-opcao premio2 centralizar">100</p>
            //   <p className="roleta-opcao premio3 centralizar">100</p>
            // </div>
            <></>
        }
      </section>

    </>
  )
}

export default App
