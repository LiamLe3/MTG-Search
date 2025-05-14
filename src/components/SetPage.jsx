import { useEffect, useState } from 'react';
import '../css/SetPage.css'
import Header from './Header';
import Footer from './Footer';
export default function SetPage() {
  const [roots, setRoots] = useState([]);
  const [nodeMap, setNodeMap] = useState(null);

  async function fetchSets() {
    try {
      const response = await fetch('https://api.scryfall.com/sets');
      if(!response.ok) throw new Error('Failed to fetch sets');
      const data = await response.json();
      console.log(data);
      buildSetTree(data.data);
    } catch (error) {
      console.error('Error fetching rulings: ', error);
    }
  }

  useEffect(() => {
    fetchSets();
  }, []);

  function formatSetTypeName(typeName) {
    return typeName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function buildSetTree(data) {
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

    setRoots(roots);
    setNodeMap(nodeMap);
  }

  function recursivePrintSets(set, nodeMap, depth = 0) {
    const children = nodeMap.get(set.code) || [];
    return [
      <tr key={set.code}>
        <td className="set-name">
          {depth > 0 && <span className={`${depth === 1 ? 'indent' : 'indent-more'}`}>↳</span>}
          <img className="set-symbol" src={set.icon_svg_uri} alt={set.code}/>
          <span>{set.name}</span>
          <span className="set-code">{set.code.toUpperCase()}</span>
        </td>
        <td>{set.card_count}</td>
        <td>{set.released_at}</td>
        <td>{formatSetTypeName(set.set_type)}</td>
      </tr>,
      ...children.flatMap(child => recursivePrintSets(child, nodeMap, depth + 1))
    ];
  }

  return (
    <>
      <Header />
      <main>
        <section className="set-page">
          <table className="set-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Cards</th>
                <th>Date</th>
                <th>Set Type</th>
              </tr>
            </thead>
            <tbody>
              {roots.flatMap(set => recursivePrintSets(set, nodeMap))}
            </tbody>
          </table>
        </section>
      </main>
      <Footer />
    </>
  );
};