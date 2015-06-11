
foreach ($session->getVid4() as $vidCours)
{
    if (!empty($vidCours) && is_numeric($vidCours->getId()) && $vidCours->getName() != '')
    {
        $vid = $em->getRepository('CD\ConfigBundle\Entity\Video')->findOneById($vidCours->getId());
        $vid->setName($vidCours->getName());
        $vid->setDescription($vidCours->getDescription());
        $em->flush();
	}
}
/**
 * Ah ah lol! You don't know why?? Really? Just look around you
 * and see the number of line in this action.. See all this
 * copy-pasted code.. Everything is wrong here. In fact it's a
 * miracle that everything else works properly >_<
 */
// a decommenter pour pouvoir modifier les informations de la video de sessions, MAIS ce code bug, et je ne sais pas pourquoi
// --------------______________________-------------------------____________________________--------------------------
/*if(!empty($session->getVidSess()) && is_numeric($session->getVidSess()->getId()) && $session->getVidSess()->getName()!='') {
  $vid=$em->getRepository('CD\ConfigBundle\Entity\Video')->findOneById($session->getVidSess()->getId());
  $vid->setName($session->getVidSess()->getName());
  $vid->setDescription($session->getVidSess()->getDescription());
  $em->flush();
}*/
$em->flush();
