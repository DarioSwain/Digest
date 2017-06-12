<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Mutation;

use DS\Digest\Bundle\DigestBundle\GraphQL\Type\DigestType;
use DS\Digest\Domain\Digest\Model\Digest;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;
use Youshido\GraphQLBundle\Field\AbstractContainerAwareField;

/**
 * Class RenameDigestField
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Mutation
 */
class RenameDigestField extends AbstractContainerAwareField
{
    /** {@inheritdoc} */
    public function getType()
    {
        return new DigestType();
    }

    /** {@inheritdoc} */
    public function build(FieldConfig $config)
    {
        $config->addArguments([
            'id' => new NonNullType(new StringType()),
            'name' => new NonNullType(new StringType()),
        ]);

        parent::build($config);
    }

    /** {@inheritdoc} */
    public function resolve($value, array $args, ResolveInfo $info)
    {
        $documentManager = $this->container->get('doctrine_mongodb.odm.document_manager');
        $digestRepository = $documentManager->getRepository(Digest::class);

        /** @var Digest $digest */
        $digest = $digestRepository->find($args['id']);
        if (null === $digest) {
            throw new \Exception("Digest {$args['id']} not found.");
        }

        $digest->rename($args['name']);

        $documentManager->persist($digest);
        $documentManager->flush($digest);

        return $digest;
    }
}
