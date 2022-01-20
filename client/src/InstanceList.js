import { formatDistance, parseISO } from "date-fns";

const InstanceList = ({ items }) => {
  return (
    <ul>
      {items.map((instance) => (
        <InstanceItem key={instance.id} instance={instance} />
      ))}
    </ul>
  );
};

const InstanceItem = ({ instance }) => {
  const updatedAt = parseISO(instance.updatedAt);
  const lastSeen = formatDistance(updatedAt, Date.now());
  const createdAt = parseISO(instance.createdAt);
  const runningFor = formatDistance(createdAt, updatedAt);
  return (
    <li key={instance.id}>
      {instance.instanceId}, pinged {instance.pingReceived} times, last seen{" "}
      {lastSeen} ago, running for {runningFor}.
    </li>
  );
};

export default InstanceList;
