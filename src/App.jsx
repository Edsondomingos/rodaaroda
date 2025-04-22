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
  const [numero, setNumero] = useState(-5)
  const [modal, setModal] = useState(false)

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
        setLetrasEncontradas([])
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
      window.location.reload()
    }
  }


  const escolher = () => {
    setNumero(-5)
    console.log(document.querySelector('.seta'))

    setTimeout(() => {
      setNumero(85)
      console.log(document.querySelector('.seta'))
    }, 2000)

    setTimeout(() => {
      const n = Math.floor((Math.random() * 90) - 5)
      setNumero(n)
    }, 3000)

    console.log(document.querySelector('.seta'))
  }


  return (
    <section className='container'>

      <section className="ajuda centralizar">
        <button title='Ajuda: Entenda o jogo' onClick={() => setModal(true)}>?</button>
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
                      // letra === '-' ?
                      // <p style={{color: '#fff'}} key={index}>ok</p> :
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
            <div className="roleta-circulo">
              <div className="roleta-opcao centralizar">
                <p className='roleta-opcao-nome'>3 Confeitos</p>
              </div>
              <div className="roleta-opcao centralizar">
                <p className='roleta-opcao-nome'>2 Confeitos</p>
              </div>
              <div className="roleta-opcao centralizar">
                <p className='roleta-opcao-nome'>1 Confeitos</p>
              </div>
              <div className="roleta-opcao centralizar">
                <p className='roleta-opcao-nome'>Perdeu Tudo</p>
              </div>
              <div className="roleta-opcao centralizar">
                <p className='roleta-opcao-nome'>1 Doce</p>
              </div>
              <div className="roleta-opcao centralizar">
                <p className='roleta-opcao-nome'>2 Doces</p>
              </div>
              <div className="roleta-opcao centralizar">
                <p className='roleta-opcao-nome'>3 Doces</p>
              </div>
              <div className="roleta-opcao centralizar">
                <p className='roleta-opcao-nome'>Passa a Vez</p>
              </div>
              <div className="roleta-opcao centralizar">
                <p className='roleta-opcao-nome'>1 Pirulito</p>
              </div>
              <div className="roleta-opcao centralizar">
                <p className='roleta-opcao-nome'>2 Pirulitos</p>
              </div>
              <div className='seta' style={{ left: numero + '%', transition: '5s' }} onClick={() => escolher()}></div>
            </div>
        }

      </section>


      {
        modal ?
          <section className="modal">
            <article className='modal-conteudo '>

              <div>
                <h1>Regras</h1>
                <ol>
                  <li>Após os participantes serem escolhidos, sera estabelecido a sequencia de jogadores (1º, 2º ...)</li>
                  <li>Antes de poder falar a letra, o participante (grupo), precisar saber o premio por acertar a letra</li>
                  <li>Cada participante pode falar apenas uma letra por vez após o
                    premio acumulativo ser mostrado aleatoriamente</li>
                    <li>Caso o participante acerte a letra, poderá ter a chance de um novo premio aleatorio e arriscar uma nova letra</li>
                    <li>Caso erre a letra, passará a sua vez, mas continuará com o premio acumulado</li>
                  <li>O participante pode arriscar a palavra apenas se sobrarem no minimo 3 letras</li>
                  <li>Apenas um unico participante por rodada ganha o seu proprio premio acumulado na rodada</li>
                  <li>Ao fim, o vencedor será o participante que tiver a maior quantidade de premios acumulados em todas as rodadas.</li>
                  <li>Entre as opções de prêmios, há opções de PERDER ou PASSAR A VEZ, sem ter chance falar nenhuma letra ou arriscar a palavra nas respectivas opções.</li>
                </ol>
              </div>
            </article>
            <button onClick={() => setModal(false)} className='btn-fechar'>Fechar</button>
          </section>
          :
          ""}
    </section>
  )
}

export default App
