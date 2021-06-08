import { useReducer } from 'react'
import { Waypoint } from 'react-waypoint'
import './App.css';

const mockArray = new Array(10);

const mockList = {
    isLastPage: false,
    loading: false,
    error: {
        code: 101,
        message: '',
    },
    items: mockArray.fill(1),
}

const Line = (props) => {
    const {index, name} = props
    return <div className="line">{index} -- {name}</div>
}

const listReducer = (state, payload) => {
    const { items: preItems } = state || {}
    const { items: curItems } = payload || {}
    let newItems = [...preItems]
    if (curItems) {
        newItems  = [...preItems, ...curItems]
    }
    return {...state, ...payload, ...{ items: newItems }}
}

function App() {
  const [list, dispatch] = useReducer(listReducer, mockList)
  const safeItems = list.items
  const { loading, isLastPage } = list
  const loadData = () => {
      const { items } = list
      dispatch({loading: true})
      setTimeout(() => {
        if (items.length < 100) {
            dispatch({items: [1,2,3,4,5], loading: false })
          } else {
            dispatch({isLastPage: true, loading: false })
        }
      }, 500)
  }
  return (
    <div className="App">
        {safeItems.map((ele, index) => {
            return <Line index={index} name={ele} />
        })}
        <div
            style={{
                textAlign: 'center',
                height: '1px',
                width: '100%',
                clear: 'both'
            }}
        >
            {loading && <span>加载中</span>}
            {!isLastPage && <Waypoint onEnter={loadData} threshold={0.1} />}
        </div>
    </div>
  );
}

export default App;
