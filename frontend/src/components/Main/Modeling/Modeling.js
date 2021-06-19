import React, {useState, useCallback, useMemo, useEffect} from 'react';
import RangeSlider from './Inputs/Slider';
import Selector from './Inputs/Selector';
import ConfMatrix from './Interpretation/ConfMatrix';
import ROC from './Interpretation/ROC';

import API from '../../../helper/django.service';
import {dollarFormatter} from '../../../helper/formatting';

export default function Modeling(props) {

  //Keep slider value in parent
  const [sliderValue, setsliderValue] = useState(50);
  const [analysis, setAnalysis] = useState();
  const [roc, setRoc] = useState();
  const [currentModel, setCurrentModal] = useState('logit');

  useEffect (() => {

    API.getROC(currentModel)
      .then((response) => { 
        
        setRoc([]);
        setRoc([{id: "roc", data: response?.data }]);
      });

  }, [currentModel]);

  useEffect (() => {

    API.getAnalytics(currentModel, sliderValue/100)
      .then((response) => { 
        setAnalysis(response?.data);
      });

  }, [currentModel, sliderValue]);


  //need useCallback why? if this component rendered we don't want to recreate the onChange function
  const sliderValueChanged = useCallback(val => {
    console.log("NEW VALUE", val);
    setsliderValue(val);
  });

  // need useMemo why? if this component rendered we don't want to recreate a new instance of the configuration object,
  // but recreate it when sliderValue gets changed, so Slider will re-render,
  // and you can remove sliderValue from dependency array and once the parent sliderValue gets updated slider will not be re-rendered
  const sliderProps = useMemo(
    () => ({
      min: 0,
      max: 100,
      value: sliderValue,
      step: 1,
      label: "Select a decision threshold",
      description:"The decision threshold indicates how certain the model needs to be to assign the positive outcome (i.e. predicted to pay off). A higher level indicates stricter lending standards.",
      onChange: e => sliderValueChanged(e)
    }),
    // dependency array, this will call useMemo function only when sliderValue gets changed,
    // if you 100% confident sliderValue only updated from Slider, then you can keep empty dependency array
    // and it will not re-render for any configuration object change 
    [sliderValue]
  );

  return (
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
        <div className="w-full p-6 space-y-4">

          <div className="shadow overflow-hidden shadow rounded-lg bg-white">
            <div className="p-3">
              <Selector active={currentModel} setActive={setCurrentModal}/>
            </div>
          </div>

          { roc
            ? <div className="shadow overflow-hidden shadow rounded-lg bg-white">
                <h2 className="text-center text-large pt-3">ROC Curve for Selected Model Algorithm</h2>
                <ROC data={roc}/>
              </div>
            : null
          }
          
          { analysis?.model
            ? <>
                <div className="shadow overflow-hidden shadow rounded-lg bg-white">
                  <div className="p-3">
                    <RangeSlider {...sliderProps}/>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  <div className="shadow overflow-hidden shadow rounded-lg bg-white col-span-6 lg:col-span-3">
                    <div className="p-3 w-full justify-center">
                      <h1>The Model's value: <span className="text-gray-500">{ dollarFormatter(analysis?.model?.value) }</span></h1>
                      <ConfMatrix data={analysis?.model?.confmat}/>
                    </div>
                  </div>
                  <div className="shadow overflow-hidden shadow rounded-lg bg-white col-span-6 lg:col-span-3">
                    <div className="p-3 w-full justify-center">
                    <h1>Your value: <span className="text-gray-500">{ dollarFormatter(analysis?.user?.value) }</span></h1>
                      <ConfMatrix data={analysis?.user?.confmat}/>
                    </div>
                  </div>
                </div>
              </>
            : null
          }

        </div>
      </main>
    </div>
  )

}