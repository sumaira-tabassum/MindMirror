import { createContext, useContext, useState } from "react";

const HomeStateContext = createContext();

export function HomeStateProvider({ children }) {
  const [referenceFiles, setReferenceFiles] = useState ([]);
  const [comparisonFiles, setComparisonFiles] = useState ([]);
  const [readyToFetch, setReadyToFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNewComparison, setShowNewComparison] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);

  const [dropdowns, setDropdowns] = useState({
    mode: "",
    model: "",
    uploadType: "",
  });

  const [files, setFiles] = useState({
    reference: null,
    comparison: null,
  });

  function resetAll() {
    setReadyToFetch(false);
    setLoading(false);
    setShowNewComparison(false);

    setDropdowns({
      mode: "",
      model: "",
      uploadType: "",
    });

    setFiles({
      reference: null,
      comparison: null,
    });
  }

  return (
    <HomeStateContext.Provider value={{
      referenceFiles,
      setReferenceFiles,
      comparisonFiles,
      setComparisonFiles,
      readyToFetch,
      setReadyToFetch,
      loading,
      setLoading,
      showNewComparison,
      setShowNewComparison,
      dropdowns,
      setDropdowns,
      files,
      setFiles,
      resetAll,
      comparisonResult,
      setComparisonResult
    }}>
      {children}
    </HomeStateContext.Provider>
  );
}

export function useHomeState() {
  return useContext(HomeStateContext);
}
