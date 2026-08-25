import CounterClass from '../practice/Ex1_CounterClass';
import ToggleClass from '../practice/Ex2_ToggleClass';
import TimerClass from '../practice/Ex3_TimerClass';
import CounterHooks from '../practice/Ex4_CounterHooks';
import EffectSearch from '../practice/Ex5_EffectSearch';
import ListRenderer from '../practice/Ex6_ListRenderer';
import FilterFormClass from '../practice/Ex7_FilterFormClass';
import DerivedStateDemo from '../practice/Ex8_DerivedStateClass';
import PureComponentDemo from '../practice/Ex9_PureComponentMutation';
import AsyncLoaderDemo from '../practice/Ex10_AsyncUnmountClass';
import ClickCounterRef from '../practice/Ex11_UseRefMisuse';
import CallbackLogger from '../practice/Ex12_UseCallbackStale';
import PropRenameDemo from '../practice/Ex13_PropRename';
import KeyBug from '../practice/Ex14_KeyBug';
import ControlledInput from '../practice/Ex15_ControlledInput';
import UseMemoMisuse from '../practice/Ex16_UseMemoMisuse';
import PropDrillingDemo from '../practice/Ex17_PropDrilling';
import ShallowEqualDemo from '../practice/Ex18_ShallowEqual';
import EventLoopOrder from '../practice/Ex19_EventLoop';


/**
 * Playground for the debugging exercises in src/practice.
 * Each exercise has a bug described in a comment at the top of its file.
 * Open the browser console while you interact with each one.
 *
 * When you think you've fixed one, edit the file directly and save —
 * this page will hot-reload automatically.
 */
function PracticePage() {
  return (
    <div className="practice-page">
      <h2>React Debugging Practice</h2>
      <p>Each box below is buggy on purpose. Read the comment in its source file, then fix it.</p>
      <h3 className="set-heading">Set 1</h3>
      <div className="exercise-grid">
        <CounterClass />
        <ToggleClass />
        <TimerClass />
        <CounterHooks />
        <EffectSearch />
        <ListRenderer />
        <FilterFormClass />
      </div>

      <h3 className="set-heading">Set 2 — getDerivedStateFromProps, PureComponent, async cleanup, refs, useCallback, prop naming</h3>
      <div className="exercise-grid">
        <DerivedStateDemo />
        <PureComponentDemo />
        <AsyncLoaderDemo />
        <ClickCounterRef />
        <CallbackLogger />
        <PropRenameDemo />
      </div>

      <h3 className="set-heading">Set 3 — interview prep drills</h3>
      <div className="exercise-grid">
        <KeyBug />
        <ControlledInput />
        <UseMemoMisuse />
        <PropDrillingDemo />
        <ShallowEqualDemo />
        <EventLoopOrder />
      </div>
    </div>
  );
}

export default PracticePage;
