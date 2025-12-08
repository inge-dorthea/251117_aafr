import { useState, useEffect, useCallback } from "react";

// function to reload a component - in this case the LastUpdated-component

export const useReload = () => {
    // if reloading is true: the component is not there
    // if reloading is false: the component is there
    const [reloading, setReloading] = useState(false);

    // the reload-function, sets reloading to be true
    const reload = useCallback(() => {
        setReloading(true);
    }, [setReloading]);

    // useEffect which sets reloading to false when it has been set to true
    useEffect(() => {
        if (reloading) {
            setReloading(false);
        }
    }, [reloading]);

    // function returns the function to set reloading to true
    // and the reloading-state to control the component that needs to be reloaded
    return [reload, reloading];
}