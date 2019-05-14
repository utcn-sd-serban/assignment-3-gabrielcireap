import React from 'react';
import './App.css';
import { HashRouter, Switch, Route } from "react-router-dom";
import SmartQuestionsTable from './view/question/SmartQuestionsTable';
import SmartQuestionSearchByTitle from "./view/question/SmartQuestionSearchByTitle";
import SmartQuestionSearchByTag from "./view/question/SmartQuestionSearchByTag";
import SmartAnswersTable from './view/answer/SmartAnswersTable';
import SmartMain from "./view/SmartMain";
import SmartLogin from "./view/user/SmartLogin";

const App = () => (
    <div className="App">
        <HashRouter>
            <Switch>
                <Route exact={true} component={SmartLogin} path="/" />
                <Route exact={true} component={SmartMain} path="/index/" />
                <Route exact={true} component={SmartQuestionsTable} path="/ask" />
                <Route exact={true} component={SmartQuestionSearchByTitle} path="/search-title" />
                <Route exact={true} component={SmartQuestionSearchByTag} path="/search-tag" />
                <Route exact={true} component={SmartAnswersTable} path="/answer/:id" />
            </Switch>
        </HashRouter>
    </div>
);

export default App;
