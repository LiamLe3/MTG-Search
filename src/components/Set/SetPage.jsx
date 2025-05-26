import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SetPage.css'
import Header from '../Others/Header';
import Footer from '../Others/Footer';
export default function SetPage() {
  const [rootSets, setRootSets] = useState([]);
  const [childSetMap, setChildSetMap] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /** Fetches for data of all sets */
  async function fetchSets() {
    try {
      const response = await fetch('https://api.scryfall.com/sets');
      if(!response.ok) throw new Error('Failed to fetch sets');
      const data = await response.json();
      organiseSetHierarchy(data.data);
    } catch (error) {
      console.error('Error fetching rulings: ', error);
    } finally {
      setLoading(false);
    }
  }

  /** Capitalise Set Type Name */
  function formatSetType(typeName) {
    return typeName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /** Organises main sets and subsets hierarchy */
  function organiseSetHierarchy(data) {
    let roots = [];
    const nodeMap = new Map();

    data.forEach((set) => {
      const parent_code = set.parent_set_code;
      if(parent_code){
        if(!nodeMap.has(parent_code)){
          nodeMap.set(parent_code, [])
        }
        nodeMap.get(parent_code).push(set);

      } else {
        roots.push(set);
      }
    });

    setRootSets(roots);
    setChildSetMap(nodeMap);
  }

  /** Displays all sets in the correct hierarchal order */
  function renderSetTree(set, nodeMap, depth = 0) {
    const children = nodeMap.get(set.code) || [];

    const onRowClick = () => {
      navigate(`/search?q=set:${set.code}`);

    };

    return [
      
      <tr key={set.code} className="table-row" onClick={onRowClick}>
        <td className="set-name">
          {depth > 0 && <span className={`${depth === 1 ? 'indent' : 'indent-more'}`}>↳</span>}
          <img className="set-symbol" src={set.icon_svg_uri} alt={set.code}/>
          <span>{set.name}</span>
          <span className="set-code">{set.code.toUpperCase()}</span>
        </td>
        <td>{set.card_count}</td>
        <td>{set.released_at}</td>
        <td>{formatSetType(set.set_type)}</td>
      </tr>,
      ...children.flatMap(child => renderSetTree(child, nodeMap, depth + 1))
    ];
  }

  /** Renders the Set page */
  function renderSetPage() {
    return (
      <section className="set-page">
        <table className="set-table">
          <thead className="table-head">
            <tr className="table-row">
              <th>Name</th>
              <th>Cards</th>
              <th>Date</th>
              <th>Set Type</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {rootSets.flatMap(set => renderSetTree(set, childSetMap))}
          </tbody>
        </table>
      </section>
    );
  }

  useEffect(() => {
    fetchSets();
  }, []);

  if(loading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <main>
        {loading ? <p>Loading page...</p> : renderSetPage()}
      </main>
      <Footer />
    </>
  );
};