import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SetPage.css'
import Header from '../Others/Header';
import Footer from '../Others/Footer';

export default function SetPage() {
  const [flatSetList, setFlatSetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const navigate = useNavigate();

    useEffect(() => {
    fetchSets();
  }, []);

  /** Fetches and processes set data given from the Scryfall API */
  async function fetchSets() {
    try {
      const response = await fetch('https://api.scryfall.com/sets');
      if(!response.ok) throw new Error('Failed to fetch sets');
      const data = await response.json();
      flattenSetHierarchy(data.data);
    } catch (error) {
      console.error('Error fetching sets: ', error);
      setErrorMsg('Failed to fetch sets...')
    } finally {
      setLoading(false);
    }
  }

  /* Flatten the tree recursively */
  function recursiveFlatten(set, depth, childrenMap, flatList) {
    flatList.push({ ...set, depth });
    const children = childrenMap.get(set.code) || [];
    children.forEach(child => recursiveFlatten(child, depth + 1, childrenMap, flatList));
  }

  /** Builds and flattens a set hierarchy, preserving parent-child relationships using depth */
  function flattenSetHierarchy(data) {
    const roots = [];
    const childrenMap = new Map();

    // Group sets by parent code
    data.forEach(set => {
      const parentCode = set.parent_set_code;
      if (parentCode) { // exists then and
        if (!childrenMap.has(parentCode)) { // add it to map
          childrenMap.set(parentCode, []);
        }
        childrenMap.get(parentCode).push(set);
      } else { // this set is a root-level set
        roots.push(set);
      }
    });

    const flatList = [];
    roots.forEach(root => recursiveFlatten(root, 0, childrenMap, flatList));

    setFlatSetList(flatList);
  }

  /** Capitalise Set Type Name e.g. (core_set -> Core Set) */
  function formatSetType(typeName) {
    return typeName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /** Navigates to a search of given set code */
  function handleRowClick(setCode) {
    navigate(`/search?q=set:${setCode}`);
  }

  /** Renders full set listing table, includes header and all set rows */
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
            {flatSetList.map(set => (
              <tr key={set.code} className="table-row" onClick={()=> handleRowClick(set.code)}>
                <td className="set-name">
                  {set.depth > 0 && (
                    <span className={`${set.depth === 1 ? 'indent' : 'indent-more'}`}>↳</span>
                  )}
                  <img className="set-symbol" src={set.icon_svg_uri} alt={set.code} />
                  <span>{set.name}</span>
                  <span className="set-code">{set.code.toUpperCase()}</span>
                </td>
                <td>{set.card_count}</td>
                <td>{set.released_at}</td>
                <td>{formatSetType(set.set_type)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }

  /** Conditionally renders error message, loading message, or the full set table */
  return (
    <>
      <Header />
      <main>
        {errorMsg && <p className="error">{errorMsg}</p>}
        {!errorMsg && loading && <p className="loading">Loading page...</p>}
        {!errorMsg && !loading && renderSetPage()}
      </main>
      <Footer />
    </>
  );
};