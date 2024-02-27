import ElevatedButton from "./Buttons/ElevatedButton";
import FilledButton, { ErrorFilledButton, InfoFilledButton, SuccesFilledButton, WarningFilledButton } from "./Buttons/FilledButton";
import FilledIconButton from "./Buttons/FilledIconButton";
import FloatingActionButton from "./Buttons/FloatingActionButton";
import GradientButton from "./Buttons/GradientButton";
import IconButton from "./Buttons/IconButton";
import OutlinedButton, { ErrorOutlinedButton, InfoOutlinedButton, WarningOutlinedButton } from "./Buttons/OutlinedButton";
import OutlinedIconButton from "./Buttons/OutlinedIconButton";
import ElevatedCard from "./Cards/ElevatedCard";
import FilledCard from "./Cards/FilledCard";
import OutlinedCard from "./Cards/OutlinedCard";
import { addCopyToClipboardToast } from "./Components/Toasts";
import Checkbox from "./Forms/Checkbox";
import Form from "./Forms/Form";
import FormInput from "./Forms/FormInput";
import FormSelect from "./Forms/FormSelect";
import FormTextarea from "./Forms/FormTextarea";
import RadioGroupPanel, { RadioGroupOption } from "./Forms/RadioGroup";
import SearchSelect from "./Forms/SearchSelect";
import { Column } from "./Layout/columns";
import { GridCols3 } from "./Layout/grids";
import { Row, RowBetween } from "./Layout/rows";

export default function Showcase() {
  function copyToClipboard(text) {
    window.navigator.clipboard.writeText(text);
    addCopyToClipboardToast('"' + text + '" copied to clipboard !');
  }

  return (
    <div className="p-5 mx-auto max-w-6xl space-y-10">
      <header className="space-y-2">
        <h1>Showcase</h1>
        <p>Welcome to the showcase page ! Here you will find a resume of all components in this package !</p>
        <hr />
      </header>
      <FilledCard className="space-y-4">
        <h2>Buttons</h2>
        <hr />
        <p>All buttons have the following properties : </p>
        <ul className="list-disc list-inside text-sm">
          <li>
            <strong>className:</strong> <span className="italic">(string)</span> - The className of the button
          </li>
          <li>
            <strong>hasIcon:</strong> <span className="italic">(boolean)</span> - Wether the button has an icon or not
          </li>
          <li>
            <strong>type:</strong> <span className="italic">(string)</span> - The type of the button
          </li>
          <li>
            <strong>onClick:</strong> <span className="italic">(function)</span> - The function to execute when the button is clicked
          </li>
          <li>
            <strong>disabled:</strong> <span className="italic">(boolean)</span> - Wether the button is disabled or not
          </li>
          <li>
            <strong>reference:</strong> <span className="italic">(function)</span> - The reference of the button
          </li>
        </ul>
        <OutlinedCard className="space-y-2">
          <RowBetween>
            <h3>Filled Button</h3>
            <OutlinedIconButton tooltip="Copy the component" onClick={() => copyToClipboard("<FilledButton />")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </OutlinedIconButton>
          </RowBetween>
          <p>A simple filled button with "primary-color" as background-color and "primary-on" as text-color.</p>
          <Row className="space-x-2 p-2">
            <FilledButton>Filled button</FilledButton>
            <FilledButton hasIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
              <p>Filled button with icon</p>
            </FilledButton>
          </Row>
          <p className="font-semibold underline">Variants : </p>
          <Row className="space-x-2 p-2">
            <ErrorFilledButton>Error filled button</ErrorFilledButton>
            <WarningFilledButton>Warning filled button</WarningFilledButton>
            <InfoFilledButton>Info filled button</InfoFilledButton>
            <SuccesFilledButton>Succes filled button</SuccesFilledButton>
          </Row>
        </OutlinedCard>
        <OutlinedCard className="space-y-2">
          <RowBetween>
            <h3>Outlined Button</h3>
            <OutlinedIconButton tooltip="Copy the component" onClick={() => copyToClipboard("<OutlinedButton />")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </OutlinedIconButton>
          </RowBetween>
          <p>A simple outlined button with "primary-color" as border-color and "primary-color" as text-color.</p>
          <Row className="space-x-2 p-2">
            <OutlinedButton>Outlined button</OutlinedButton>
            <OutlinedButton hasIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
              </svg>
              <p>Outlined button with icon</p>
            </OutlinedButton>
          </Row>
          <p className="font-semibold underline">Variants : </p>
          <Row className="space-x-2 p-2">
            <ErrorOutlinedButton>Error outlined button</ErrorOutlinedButton>
            <WarningOutlinedButton>Warning outlined button</WarningOutlinedButton>
            <InfoOutlinedButton>Info outlined button</InfoOutlinedButton>
          </Row>
        </OutlinedCard>
        <OutlinedCard className="space-y-2">
          <RowBetween>
            <h3>Elevated Button</h3>
            <OutlinedIconButton tooltip="Copy the component" onClick={() => copyToClipboard("<ElevatedButton />")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </OutlinedIconButton>
          </RowBetween>
          <p>A simple outlined button with "primary-color" as border-color and "primary-color" as text-color.</p>
          <Row className="space-x-2 p-2">
            <ElevatedButton>Elevated button</ElevatedButton>
            <ElevatedButton hasIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Elevated button with icon</p>
            </ElevatedButton>
          </Row>
        </OutlinedCard>
        <OutlinedCard className="space-y-2">
          <RowBetween>
            <h3>Gradient Button</h3>
            <OutlinedIconButton tooltip="Copy the component" onClick={() => copyToClipboard("<GradientButton />")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </OutlinedIconButton>
          </RowBetween>
          <p>A simple outlined button with "primary-color" as border-color and "primary-color" as text-color.</p>
          <Row className="space-x-2 p-2">
            <GradientButton>Gradient button</GradientButton>
            <GradientButton hasIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Gradient button with icon</p>
            </GradientButton>
          </Row>
        </OutlinedCard>
        <OutlinedCard className="space-y-2">
          <RowBetween>
            <h3>Floating Action Button</h3>
            <OutlinedIconButton tooltip="Copy the component" onClick={() => copyToClipboard("<FloatingActionButton />")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </OutlinedIconButton>
          </RowBetween>
          <p>A simple outlined button with "primary-color" as border-color and "primary-color" as text-color.</p>
          <Row className="space-x-2 p-2">
            <FloatingActionButton hasIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
              </svg>
            </FloatingActionButton>
          </Row>
        </OutlinedCard>
        <OutlinedCard className="space-y-2">
          <RowBetween>
            <h3>Icon Button</h3>
            <OutlinedIconButton tooltip="Copy the component" onClick={() => copyToClipboard("<IconButton />")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </OutlinedIconButton>
          </RowBetween>
          <p>A simple filled button with "primary-color" as background-color and "primary-on" as text-color.</p>
          <Row className="space-x-2 p-2">
            <IconButton tooltip="Icon Button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </IconButton>
          </Row>
          <p className="font-semibold underline">Variants : </p>
          <Row className="space-x-2 p-2">
            <OutlinedIconButton tooltip="Outlined Button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </OutlinedIconButton>
            <FilledIconButton tooltip="Filled Button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </FilledIconButton>
          </Row>
        </OutlinedCard>
      </FilledCard>
      <section className="space-y-4">
        <h2>Cards</h2>
        <hr />
        <p>All cards have the following properties : </p>
        <ul></ul>
        <GridCols3 className="gap-2">
          <FilledCard>
            <RowBetween className="pb-5">
              <h3>Filled Card</h3>
              <OutlinedIconButton tooltip="Copy the component" onClick={() => copyToClipboard("<FilledCard />")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
              </OutlinedIconButton>
            </RowBetween>
            <p>A simple filled card with "background-color" as background-color and "current-color" as text-color.</p>
          </FilledCard>
          <OutlinedCard>
            <RowBetween className="pb-5">
              <h3>Outlined Card</h3>
              <OutlinedIconButton tooltip="Copy the component" onClick={() => copyToClipboard("<OutlinedCard />")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
              </OutlinedIconButton>
            </RowBetween>
            <p>A simple outlined card with "current-color" as text-color and border-color.</p>
          </OutlinedCard>
          <ElevatedCard>
            <RowBetween className="pb-5">
              <h3>Elevated Card</h3>
              <OutlinedIconButton tooltip="Copy the component" onClick={() => copyToClipboard("<ElevatedCard />")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
              </OutlinedIconButton>
            </RowBetween>
            <p>It's like a filled card with a shadow property to add elevation.</p>
          </ElevatedCard>
        </GridCols3>
      </section>
      <FilledCard className="space-y-4">
        <h2>Forms</h2>
        <p>
          It all starts wit a {"<Form />"} component. It just call a function onSubmit to be handled by a javascript funciton. It does not accept a method
          parameter.
        </p>
        <hr />
        <Form className="space-y-4">
          <h3>Register form</h3>
          <hr />

          <Column className="space-y-2 p-2">
            <h5>Form Inputs</h5>
            <p>
              The <strong>{"<FormInput />"}</strong> is by default a text input type. They accept the same properties a normal {"<input />"} does.
            </p>
            <OutlinedCard className="space-y-2">
              <Row className="space-x-2">
                <FormInput required title="First name" placeholder="John" />
                <FormInput required title="Last name" placeholder="Doe" />
                <FormInput title="Username" placeholder="jhondoe" />
              </Row>
              <Row className="space-x-2">
                <FormInput type="date" title="Birthday" />
                <FormInput required title="Password" type={"password"} placeholder="Password..." />
                <FormInput
                  required
                  title="Repeat password"
                  disabled
                  messageDisabled="Please type your password before."
                  type={"Confimr Password"}
                  placeholder="Password again..."
                />
              </Row>
            </OutlinedCard>
          </Column>
          <hr />

          <Column className="space-y-2 p-2">
            <h5>Form Select</h5>
            <p>
              The <strong>{"<FormSelect />"}</strong> allows you to chose betewen diferents options. They accept the same properties a normal {"<select />"}{" "}
              does.
            </p>
            <OutlinedCard className="space-y-2">
              <Row className="space-x-2">
                <FormSelect
                  required
                  allowEmpty
                  title="Country"
                  options={[
                    { value: "fr", label: "France" },
                    { value: "en", label: "England" },
                    { value: "es", label: "Spain" },
                    { value: "it", label: "Italy", disable: true },
                  ]}
                />
                <FormSelect
                  allowEmpty
                  title="City"
                  options={[
                    { value: "paris", label: "Paris" },
                    { value: "london", label: "London" },
                  ]}
                />
                <FormSelect
                  allowEmpty
                  title="Region"
                  disabled
                  messageDisabled="Regions are only available for France."
                  options={[
                    { value: "idf", label: "Île-de-France" },
                    { value: "bfc", label: "Bourgogne-Franche-Comté" },
                  ]}
                />
              </Row>
            </OutlinedCard>
          </Column>
          <hr />

          <Column className="space-y-2 p-2">
            <h5>Form Text Area</h5>
            <p>
              The <strong>{"<FormTextarea />"}</strong> allows you to type those long long texts. They accept the same properties a normal {"<textarea />"}{" "}
              does.
            </p>
            <OutlinedCard className="space-y-2">
              <Row className="space-x-2">
                <FormTextarea required title="Biography" maxLength={255} errorMessage={"Please fill in the champ"} />
                <FormTextarea title="Commentaire" resizable={false} maxLength={255} defaultValue={"A not resizable textarea with a default value"} />
              </Row>
            </OutlinedCard>
          </Column>
          <hr />

          <Column className="space-y-2 p-2">
            <h5>Form Checkbox</h5>
            <p>
              A simple <strong>{"<Checkbox />"}</strong> with a <strong>{"<ControlledCheckbox />"}</strong> variant that can be controlled by a state.
            </p>
            <OutlinedCard className="space-y-2">
              <Row>
                <Checkbox />
                <p>I agree to the terms and conditions</p>
              </Row>
              <Row>
                <Checkbox defaultSelected />
                <p>I would like to receive promtions emails</p>
              </Row>
            </OutlinedCard>
          </Column>
          <hr />

          <Column className="space-y-2 p-2">
            <h5>Form Radio Group</h5>
            <p>
              A <strong>{"<RadioGroupPanel />"}</strong> component composed by many <strong>{"<RadioGroupOption />"}</strong> components.
            </p>
            <OutlinedCard className="space-y-2">
              <RadioGroupPanel title={"Select yours"}>
                <RadioGroupOption text={"Option 1"} />
                <RadioGroupOption text={"Option 2"} />
                <RadioGroupOption text={"Option 3"} />
              </RadioGroupPanel>
            </OutlinedCard>
          </Column>
          <hr />

          <Column className="space-y-2 p-2">
            <h5>Form Search Select</h5>
            <p>
              A <strong>{"<SearchSelect />"}</strong> component that allows user to input a new value or select an existing one. It can be an unique value or
              multiple. And the value can be nullable or not.
            </p>
            <OutlinedCard className="space-y-2">
              <Row className="space-x-2">
                <SearchSelect
                  required
                  isNullable
                  allowCustomValue
                  items={[
                    { id: 1, label: "Item 1" },
                    { id: 2, label: "Item 2" },
                    { id: 3, label: "Item 3", disabled: true },
                  ]}
                />
              </Row>
            </OutlinedCard>
          </Column>
        </Form>
      </FilledCard>
    </div>
  );
}
