import { useState } from "react";

export const NewSetForm = () => {
    const [nameOfSet, setNameOfSet] = useState<string>('')
  return (
    <div className="flex flex-col place-content-center gap-2">
      <h1 className="place-self-center font-semibold">Create new set</h1>
      <form>
        <input
          type="nameOfSet"
          placeholder="Name of your set"
          value={nameOfSet}
          onChange={(e) => setNameOfSet(e.target.value)}
        />
      </form>
    </div>
  );
};
